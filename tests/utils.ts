import { vi, expect } from 'vitest';
import { shallowMount, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { idb } from 'purejs-idb';

import { createRouter, createMemoryHistory } from 'vue-router';
import routes from '@/router/routes';

import type { SpyInstance } from 'vitest';
import type { TestingOptions } from '@pinia/testing';

interface TestRouter extends Router {
  pushOriginal: Function;
}

type RouterOptions = {
  name?: string;
  query?: Record<string, unknown>;
  hash?: string;
  history?: string;
};

const createTestRouter = async (
  options: RouterOptions,
  cache: Record<string, unknown>,
): Promise<TestRouter> => {
  const router: Router = createRouter({
    history: createMemoryHistory(),
    routes,
  });

  const startRoute = options.name || 'root';

  const route = routes.find(item => item.name === startRoute);

  if (options?.history) {
    router.options.history.state.back = options.history;

    delete options.history;
  }

  const routerGuardName: string = (<BeforeEnter>route?.beforeEnter)?.name || '';

  if (routerGuardName === 'isAuthUser') {
    cache.token = 'Token';
    cache.user = { id: 42 };
  } else if (routerGuardName === 'isNotRegisteredUser') {
    cache.token = 'Token';

    cache.user = {
      id: 42,
      registration_completed: false,
    };
  }

  await router.push(<RouteLocationRaw>options);

  const { push } = router;

  (<TestRouter>router).pushOriginal = push;
  router.push = vi.fn();
  router.replace = vi.fn();
  router.back = vi.fn();

  return <TestRouter>router;
};

type CreateWrapperOptions = {
  url?: string;
  route?: RouterOptions;
  idb?: Record<string, unknown>;
  mockStore?: boolean;
  store?: Record<string, unknown>;
  stubs?: string[];
  provide?: Record<string, unknown>;
  slots?: Record<string, string>;
  props?: Record<string, unknown>;
};

type GlobalOptions = {
  plugins: any[];
  stubs: string[];
  provide?: Record<string, unknown>;
};

type ComponentOptions = {
  slots?: Record<string, string>;
  props?: Record<string, unknown>;
};

export const createWrapper = async (
  type: 'mount' | 'shallow',
  component: any,
  options: CreateWrapperOptions | undefined = {},
) => {
  if (!['mount', 'shallow'].includes(type)) {
    return null;
  }

  if (options.url) {
    window.location.assign(options.url);
  } else {
    window.location.assign('http://localhost:8080');
  }

  const cache: Record<string, unknown> = {};

  if (options.idb) {
    Object.entries(options.idb).forEach(([key, value]) => {
      cache[key] = value;
    });
  }

  const idbGet: SpyInstance = vi.spyOn(idb, 'get');

  idbGet.mockImplementation((params: string | string[]): unknown => {
    if (Array.isArray(params)) {
      return params.map((param: string) => cache[param]);
    }

    return cache[params];
  });

  const routeOptions: RouterOptions | {} = options.route || {};

  const router: TestRouter = await createTestRouter(routeOptions, cache);

  const piniaOptions: TestingOptions = {
    initialState: {
      base: options.store || {},
    },
    stubActions: options.mockStore ?? true,
    createSpy: vi.fn,
  };

  const globalOptions: GlobalOptions = {
    plugins: [router, createTestingPinia(piniaOptions)],
    stubs: ['RouterView', 'Transition', 'AppTeleport', 'AppImg'],
  };

  if (Array.isArray(options.stubs)) {
    globalOptions.stubs.push(...options.stubs);
  }

  if (options.provide) {
    globalOptions.provide = options.provide;
  }

  const componentOptions: ComponentOptions = {};

  if (options.slots) {
    componentOptions.slots = options.slots;
  }

  if (options.props) {
    componentOptions.props = options.props;
  }

  const renderMethod = type === 'mount' ? mount : shallowMount;

  const wrapper = renderMethod(component, {
    global: globalOptions,
    ...componentOptions,
  });

  expect(wrapper.exists()).toBe(true);

  return {
    wrapper,
    self: wrapper.vm,
  };
};

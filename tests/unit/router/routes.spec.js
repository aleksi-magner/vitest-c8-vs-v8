import { h } from 'vue';
import { vi, afterEach, describe, test, expect } from 'vitest';
import { shallowMount, enableAutoUnmount } from '@vue/test-utils';

import { router } from '@/router';
import routes from '@/router/routes';

enableAutoUnmount(afterEach);

const createEmpty = name => ({
  __esModule: true,
  default: {},
  name,
  render: () => h('div'),
});

vi.mock('@/views/AnyPage.vue', () => createEmpty('AnyPage'));

describe('router/routes', () => {
  test('Check route categories', () => {
    expect(routes).toHaveLength(7);

    const root = routes.find(route => route.name === 'root');

    expect(root).toEqual({
      name: 'root',
      path: '/',
      redirect: {
        name: 'any',
        params: {},
      },
    });

    const redirect = routes.find(route => route.name === 'not-found');

    expect(redirect).toEqual({
      name: 'not-found',
      path: '/:pathMatch(.*)*',
      redirect: {
        name: 'any',
        params: {},
      },
    });

    const expectedRoutes = ['registration', 'messages', 'shifts', 'info', 'any'];

    const onlyRoutes = routes
      .filter(route => !['root', 'not-found'].includes(route.name))
      .map(route => route.name);

    expect(onlyRoutes).toEqual(expectedRoutes);
  });

  test.each(routes)('Check import components', async route => {
    const component = route?.component || undefined;

    if (typeof component === 'function') {
      const importedComponent = await component();

      shallowMount(importedComponent);
    }
  });

  test('Check example route', async () => {
    const emptyContentRoute = {
      name: 'example',
      path: '/example',
      component: {
        name: 'AnyComponent',
        render: () => h('p', 'Any content'),
      },
    };

    router.addRoute(emptyContentRoute);

    const wrapper = shallowMount(emptyContentRoute.component);

    expect(wrapper.html()).toBe('<p>Any content</p>');

    await router.push({ name: 'example' });
  });
});

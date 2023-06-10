import { vi, afterEach, describe, test, expect } from 'vitest';
import { enableAutoUnmount } from '@vue/test-utils';

import { createWrapper } from '#utils';

import AnyPage from '@/views/AnyPage.vue';

enableAutoUnmount(afterEach);

describe('views/AnyPage.vue', () => {
  const createCases = [
    {},
    {
      shift: true,
      upcoming: true,
      worked: true,
    },
    {
      upcoming: true,
      worked: true,
    },
    {
      worked: true,
    },
  ];

  test.each(createCases)('Check create', async query => {
    const setFill = vi.fn();

    const { wrapper } = await createWrapper('mount', AnyPage, {
      route: {
        name: 'shifts',
        query,
      },
      provide: { setFill },
    });

    expect(setFill).toHaveBeenCalledTimes(1);
    expect(setFill).toHaveBeenCalledWith(true);

    wrapper.unmount();

    expect(setFill).toHaveBeenCalledTimes(2);
    expect(setFill).toHaveBeenCalledWith(false);
  });
});

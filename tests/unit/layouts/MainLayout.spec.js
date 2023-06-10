import { vi, afterEach, describe, test, expect } from 'vitest';
import { enableAutoUnmount } from '@vue/test-utils';

import { createWrapper } from '#utils';

import MainLayout from '@/layouts/MainLayout.vue';

enableAutoUnmount(afterEach);

describe('layouts/MainLayout.vue', () => {
  test('render', async () => {
    const { self } = await createWrapper('mount', MainLayout, {
      stubs: ['TopBar', 'BottomNavigation'],
    });

    const setFill = vi.spyOn(self, 'setFill');

    expect(self.fill).toBe(false);
    expect(setFill).not.toHaveBeenCalled();

    const provide = MainLayout.provide.call({
      setFill: self.setFill,
    });

    provide.setFill(true);

    expect(setFill).toHaveBeenCalledTimes(1);
    expect(setFill).toHaveBeenCalledWith(true);
    expect(self.fill).toBe(true);
  });
});

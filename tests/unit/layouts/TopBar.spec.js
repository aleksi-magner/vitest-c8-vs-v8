import { afterEach, describe, test, expect } from 'vitest';
import { enableAutoUnmount } from '@vue/test-utils';

import { createWrapper } from '#utils';

import TopBar from '@/layouts/TopBar.vue';

enableAutoUnmount(afterEach);

describe('layouts/TopBar.vue', () => {
  test('Check create', async () => {
    const { wrapper, self } = await createWrapper('mount', TopBar);

    expect(self.counter).toBe('3');

    expect(wrapper.get('[data-test="name"]').text()).toBe('Your profile');
    expect(wrapper.get('[data-test="description"]').text()).toBe('not verified');
  });
});

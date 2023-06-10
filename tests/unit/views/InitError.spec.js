import { afterEach, describe, test, expect } from 'vitest';
import { enableAutoUnmount } from '@vue/test-utils';

import { createWrapper } from '#utils';

import InitError from '@/views/InitError.vue';

enableAutoUnmount(afterEach);

describe('views/InitError.vue', () => {
  test('render', async () => {
    const { wrapper } = await createWrapper('mount', InitError);

    expect(wrapper.isVisible()).toBe(true);
  });
});

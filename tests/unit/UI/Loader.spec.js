import { describe, test, expect } from 'vitest';

import { createWrapper } from '#utils';

import Loader from '@/UI/Loader.vue';

describe('UI/Loader.vue', () => {
  test('Check created', async () => {
    const { wrapper } = await createWrapper('mount', Loader);

    expect(document.body.style.overflow).toBe('hidden');

    wrapper.unmount();

    expect(document.body.style.overflow).toBe('');
  });
});

import { vi, beforeEach, describe, test, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { useBaseStore } from '@/stores';

vi.mock('@/api/user');

describe('stores', () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());

    store = useBaseStore();
  });

  test('startLoading', () => {
    expect(store.loading).toBe(false);
    expect(store.componentsWithLoading).toEqual([]);

    store.startLoading(42);

    expect(store.loading).toBe(true);
    expect(store.componentsWithLoading).toEqual([42]);

    store.startLoading(42);

    expect(store.loading).toBe(true);
    expect(store.componentsWithLoading).toEqual([42]);

    store.startLoading('any-key');

    expect(store.loading).toBe(true);
    expect(store.componentsWithLoading).toEqual([42, 'any-key']);
  });

  test('endLoading', () => {
    expect(store.loading).toBe(false);
    expect(store.componentsWithLoading).toEqual([]);

    store.endLoading(42);

    expect(store.loading).toBe(false);
    expect(store.componentsWithLoading).toEqual([]);

    store.startLoading('any-key');

    expect(store.loading).toBe(true);
    expect(store.componentsWithLoading).toEqual(['any-key']);

    store.endLoading('any-key');

    expect(store.loading).toBe(false);
    expect(store.componentsWithLoading).toEqual([]);
  });
});

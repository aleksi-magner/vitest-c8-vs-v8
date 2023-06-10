import { vi, describe, test } from 'vitest';

vi.mock('vue', async () => {
  const original = await vi.importActual('vue');

  return {
    ...original,
    createApp: () => ({
      use: vi.fn(),
      mount: vi.fn(),
    }),
  };
});

describe.skip('main', () => {
  test('Check success init', async () => {
    vi.doMock('purejs-idb', () => ({
      initDatabase: () => Promise.resolve(),
    }));

    await import('@/main');

    vi.resetModules();
  });

  test('Check filed init', async () => {
    vi.doMock('purejs-idb', () => ({
      initDatabase: () => Promise.reject(),
    }));

    await import('@/main');

    vi.resetModules();
  });
});

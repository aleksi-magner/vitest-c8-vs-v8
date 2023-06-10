import { afterEach, describe, test, expect } from 'vitest';
import { config, enableAutoUnmount } from '@vue/test-utils';

config.global.renderStubDefaultSlot = true;

import { createWrapper } from '#utils';

import App from '@/App.vue';

enableAutoUnmount(afterEach);

describe('App.vue', () => {
  const stubs = ['AppLoader', 'UnreadMessages', 'AskPushPermission', 'PWAInfo', 'MarketingIntro'];

  test('Check create', async () => {
    const { self } = await createWrapper('mount', App, {
      route: { name: 'any' },
      idb: {
        'hide-marketing-info': true,
      },
      mockStore: false,
      stubs,
    });

    expect(self.isBaseDataLoaded).toBe(true);

    expect(self.layout).toBe('MainLayout');
  });
});

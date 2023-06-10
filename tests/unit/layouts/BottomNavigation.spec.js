import { afterEach, describe, test, expect } from 'vitest';
import { enableAutoUnmount } from '@vue/test-utils';

import { createWrapper } from '#utils';

import BottomNavigation from '@/layouts/BottomNavigation.vue';

enableAutoUnmount(afterEach);

describe('layouts/BottomNavigation.vue', () => {
  const createCases = [
    {
      width: 1280,
      route: 'any',
      expected: {
        isExtraSmall: false,
        navigation: [
          {
            icon: 'key',
            title: 'Registration',
            link: 'registration',
            active: false,
            counter: 0,
          },
          {
            icon: 'popup',
            title: 'Messages',
            link: 'messages',
            active: false,
            counter: 1,
          },
          {
            icon: 'calendar',
            title: 'Shifts',
            link: 'shifts',
            active: false,
            counter: 0,
          },
          {
            icon: 'info',
            title: 'Info',
            link: 'info',
            active: false,
            counter: 0,
          },
        ],
      },
    },
    {
      width: 480,
      route: 'info',
      expected: {
        isExtraSmall: false,
        navigation: [
          {
            icon: 'key',
            title: 'Registration',
            link: 'registration',
            active: false,
            counter: 0,
          },
          {
            icon: 'popup',
            title: 'Messages',
            link: 'messages',
            active: false,
            counter: 1,
          },
          {
            icon: 'calendar',
            title: 'Shifts',
            link: 'shifts',
            active: false,
            counter: 0,
          },
          {
            icon: 'info',
            title: 'Info',
            link: 'info',
            active: true,
            counter: 0,
          },
        ],
      },
    },
    {
      width: 280,
      route: 'shifts',
      expected: {
        isExtraSmall: true,
        navigation: [
          {
            icon: 'key',
            title: 'Registration',
            link: 'registration',
            active: false,
            counter: 0,
          },
          {
            icon: 'popup',
            title: 'Messages',
            link: 'messages',
            active: false,
            counter: 1,
          },
          {
            icon: 'calendar',
            title: 'Shifts',
            link: 'shifts',
            active: true,
            counter: 0,
          },
          {
            icon: 'info',
            title: 'Info',
            link: 'info',
            active: false,
            counter: 0,
          },
        ],
      },
    },
  ];

  test.each(createCases)('Check create', async payload => {
    const { width, route, expected } = payload;

    const { innerWidth } = window;

    window.innerWidth = width;

    const { wrapper, self } = await createWrapper('mount', BottomNavigation, {
      route: { name: route },
    });

    expect(self.isExtraSmall).toBe(expected.isExtraSmall);
    expect(self.navigation).toEqual(expected.navigation);

    const expectedLength = expected.navigation.length;

    const items = wrapper.findAll('[data-test="navigation-item"]');

    expect(items).toHaveLength(expectedLength);

    const titles = wrapper.findAll('[data-test="navigation-title"]');

    if (expected.isExtraSmall) {
      const hasActiveLink = ['documents', 'messages', 'shifts', 'info'].includes(route);

      expect(titles).toHaveLength(hasActiveLink ? 1 : 0);
    } else {
      expect(titles).toHaveLength(expectedLength);
    }

    window.innerWidth = innerWidth;
  });
});

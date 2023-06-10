import { afterEach, describe, test, expect } from 'vitest';
import { enableAutoUnmount } from '@vue/test-utils';

import { createWrapper } from '#utils';

import AppBadge from '@/UI/Badge.vue';

enableAutoUnmount(afterEach);

describe('UI/Badge.vue', () => {
  const createCases = [
    {
      props: {},
      expected: {
        count: 0,
        type: '',
        x: '',
        y: '',
        position: '',
      },
    },
    {
      props: {
        count: undefined,
        type: undefined,
        x: undefined,
        y: undefined,
      },
      expected: {
        count: 0,
        type: '',
        x: '',
        y: '',
        position: '',
      },
    },
    {
      props: {
        x: '50%',
      },
      expected: {
        count: 0,
        type: '',
        x: '50%',
        y: '',
        position: '',
      },
    },
    {
      props: {
        count: '42',
        x: '50%',
      },
      expected: {
        count: '42',
        type: '',
        x: '50%',
        y: '',
        position: '--badge-x: 50%',
      },
    },
    {
      props: {
        count: 42,
      },
      expected: {
        count: 42,
        type: '',
        x: '',
        y: '',
        position: '',
      },
    },
    {
      props: {
        count: 42,
        x: '-15px',
        y: '5%',
      },
      expected: {
        count: 42,
        type: '',
        x: '-15px',
        y: '5%',
        position: '--badge-x: -15px; --badge-y: 5%',
      },
    },
    {
      props: {
        count: 42,
        x: '-15px',
        y: '5%',
        type: 'priority',
      },
      expected: {
        count: 42,
        type: 'priority',
        x: '-15px',
        y: '5%',
        position: '--badge-x: -15px; --badge-y: 5%',
      },
    },
  ];

  test.each(createCases)('Check create', async payload => {
    const { props, expected } = payload;

    const { wrapper, self } = await createWrapper('mount', AppBadge, {
      props,
      slots: {
        default: '<p data-test="slot-content">Badge content</p>',
      },
    });

    const { count, type, x, y } = wrapper.props();

    expect(count).toBe(expected.count);
    expect(type).toBe(expected.type);
    expect(x).toBe(expected.x);
    expect(y).toBe(expected.y);

    expect(self.position).toBe(expected.position);

    const slotContent = wrapper.get('[data-test="slot-content"]');

    expect(slotContent.text()).toBe('Badge content');

    const badgeCount = wrapper.find('[data-test="badge-count"]');

    if (expected.count) {
      expect(badgeCount.exists()).toBe(true);

      expect(badgeCount.element.classList.contains('app-badge--priority')).toBe(
        expected.type === 'priority',
      );
    } else {
      expect(badgeCount.exists()).toBe(false);
    }
  });
});

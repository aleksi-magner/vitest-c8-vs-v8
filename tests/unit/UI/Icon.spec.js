import { vi, afterEach, describe, test, expect } from 'vitest';
import { enableAutoUnmount } from '@vue/test-utils';

import { createWrapper } from '#utils';

import AppIcon from '@/UI/Icon.vue';

enableAutoUnmount(afterEach);

describe('UI/Icon.vue', () => {
  const createCases = [
    {
      props: {},
      expected: {
        color: '',
        icon: '',
        size: '',
        disabled: false,
        iconColor: '',
        iconSize: '',
        iconDisabled: '',
        classes: 'vi-',
        styles: '',
      },
    },
    {
      props: {
        color: 'muted',
        icon: '',
        size: '',
        disabled: false,
      },
      expected: {
        color: 'muted',
        icon: '',
        size: '',
        disabled: false,
        iconColor: 'text-muted',
        iconSize: '',
        iconDisabled: '',
        classes: 'vi- text-muted',
        styles: '',
      },
    },
    {
      props: {
        color: 'base',
        icon: 'icon',
        size: 'sm',
        disabled: false,
      },
      expected: {
        color: 'base',
        icon: 'icon',
        size: 'sm',
        disabled: false,
        iconColor: 'text-base',
        iconSize: 'icon-sm',
        iconDisabled: '',
        classes: 'vi-icon text-base icon-sm',
        styles: '',
      },
    },
    {
      props: {
        color: 'primary',
        icon: 'icon',
        size: 'lg',
        disabled: true,
      },
      expected: {
        color: 'primary',
        icon: 'icon',
        size: 'lg',
        disabled: true,
        iconColor: 'text-primary',
        iconSize: 'icon-lg',
        iconDisabled: 'vi--disabled',
        classes: 'vi-icon text-primary icon-lg vi--disabled',
        styles: '',
      },
    },
    {
      props: {
        color: 'white',
        icon: 'icon',
        size: '1x',
        disabled: false,
      },
      expected: {
        color: 'white',
        icon: 'icon',
        size: '1x',
        disabled: false,
        iconColor: 'text-white',
        iconSize: 'icon-1x',
        iconDisabled: '',
        classes: 'vi-icon text-white icon-1x',
        styles: '',
      },
    },
    {
      props: {
        color: 'red',
        icon: 'icon',
        size: '2x',
        disabled: true,
      },
      expected: {
        color: 'red',
        icon: 'icon',
        size: '2x',
        disabled: true,
        iconColor: 'text-custom',
        iconSize: 'icon-2x',
        iconDisabled: 'vi--disabled',
        classes: 'vi-icon text-custom icon-2x vi--disabled',
        styles: '--custom-color: red',
      },
    },
    {
      props: {
        color: '#defae1',
        icon: 'icon',
        size: '3x',
        disabled: false,
      },
      expected: {
        color: '#defae1',
        icon: 'icon',
        size: '3x',
        disabled: false,
        iconColor: 'text-custom',
        iconSize: 'icon-3x',
        iconDisabled: '',
        classes: 'vi-icon text-custom icon-3x',
        styles: '--custom-color: #defae1',
      },
    },
    {
      props: {
        color: 'success',
        icon: 'icon',
        size: 'logo',
        disabled: true,
      },
      expected: {
        color: 'success',
        icon: 'icon',
        size: 'logo',
        disabled: true,
        iconColor: 'text-success',
        iconSize: 'icon-big-logo',
        iconDisabled: 'vi--disabled',
        classes: 'vi-icon text-success icon-big-logo vi--disabled',
        styles: '',
      },
    },
    {
      props: {
        color: 'error',
        icon: 'icon',
        size: 'any',
        disabled: true,
      },
      expected: {
        color: 'error',
        icon: 'icon',
        size: 'any',
        disabled: true,
        iconColor: 'text-error',
        iconSize: '',
        iconDisabled: 'vi--disabled',
        classes: 'vi-icon text-error vi--disabled',
        styles: '',
      },
    },
  ];

  test.each(createCases)('Check create', async payload => {
    const { props, expected } = payload;

    const { wrapper, self } = await createWrapper('mount', AppIcon, {
      props,
    });

    const { color, icon, size, disabled } = wrapper.props();

    expect(color).toBe(expected.color);
    expect(icon).toBe(expected.icon);
    expect(size).toBe(expected.size);
    expect(disabled).toBe(expected.disabled);

    expect(self.iconColor).toBe(expected.iconColor);
    expect(self.iconSize).toBe(expected.iconSize);
    expect(self.iconDisabled).toBe(expected.iconDisabled);
    expect(self.classes).toBe(expected.classes);
    expect(self.styles).toBe(expected.styles);

    const iconNode = wrapper.find('[data-test="icon"]');

    expect(iconNode.exists()).toBe(!!expected.icon);
  });

  test.each([true, false])('Check action', async disabled => {
    const { wrapper, self } = await createWrapper('mount', AppIcon, {
      props: {
        icon: 'icon',
        disabled,
      },
    });

    const click = vi.spyOn(self, 'click');

    expect(wrapper.emitted('click')).toBeUndefined();

    const icon = wrapper.get('[data-test="icon"]');

    await icon.trigger('click');

    expect(click).toHaveBeenCalledTimes(1);

    const clickEmit = wrapper.emitted('click');

    if (disabled) {
      expect(clickEmit).toBeUndefined();
    } else {
      expect(clickEmit).toHaveLength(1);
      expect(clickEmit.at(0)).toEqual([]);
    }
  });
});

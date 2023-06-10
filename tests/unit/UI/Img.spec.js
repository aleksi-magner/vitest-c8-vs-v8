import { vi, beforeEach, afterEach, describe, test, expect } from 'vitest';
import { enableAutoUnmount } from '@vue/test-utils';

import { createWrapper } from '#utils';

import placeholder from '@/assets/img/image-placeholder.png';

import AppImg from '@/UI/Img.vue';

enableAutoUnmount(afterEach);

describe('UI/Img.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers();

    document.body.__proto__ = {
      offsetWidth: 360,
    };
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const createCases = [
    {
      props: {},
      expected: {
        width: 0,
        aspectRatio: 0,
        src: '',
        alt: 'App image',
        emit: [[false], [true], [false]],
        imgSrc: placeholder,
      },
    },
    {
      props: {
        width: 240,
        aspectRatio: 0.75,
        src: '/img/any-img.jpg',
        alt: 'Any alternative text',
      },
      expected: {
        width: 240,
        aspectRatio: 0.75,
        src: '/img/any-img.jpg',
        alt: 'Any alternative text',
        emit: [[false], [true], [false]],
        imgSrc: '/img/any-img.jpg',
      },
    },
    {
      props: {
        width: '',
        aspectRatio: '0.75',
        src: 'https://any-domain.ru/img/any-img.jpg',
        alt: '',
      },
      expected: {
        width: '',
        aspectRatio: '0.75',
        src: 'https://any-domain.ru/img/any-img.jpg',
        alt: '',
        emit: [[false], [true], [false]],
        imgSrc: 'https://any-domain.ru/img/any-img.jpg',
      },
    },
    {
      props: {
        width: '',
        aspectRatio: '',
        src: 'https://any-domain.ru/img/any-img.jpg',
        alt: '',
      },
      expected: {
        width: '',
        aspectRatio: '',
        src: 'https://any-domain.ru/img/any-img.jpg',
        alt: '',
        emit: [[false], [true], [false]],
        imgSrc: 'https://any-domain.ru/img/any-img.jpg',
      },
    },
  ];

  test.each(createCases)('Check create', async payload => {
    const { props, expected } = payload;

    const { wrapper, self } = await createWrapper('mount', AppImg, {
      props,
    });

    const checkURL = vi.spyOn(self, 'checkURL');

    const { width, aspectRatio, src, alt } = wrapper.props();

    expect(width).toBe(expected.width);
    expect(aspectRatio).toBe(expected.aspectRatio);
    expect(src).toBe(expected.src);
    expect(alt).toBe(expected.alt);

    expect(checkURL).not.toHaveBeenCalled();

    vi.runOnlyPendingTimers();

    const loadingEmit = wrapper.emitted('loading');

    expect(loadingEmit).toHaveLength(expected.emit.length);
    expect(loadingEmit).toEqual(expected.emit);

    expect(self.loading).toBe(false);

    expect(wrapper.get('.app-img').element.src).toBe(expected.imgSrc);
  });

  test('Check change src', async () => {
    const { wrapper, self } = await createWrapper('mount', AppImg, {
      props: {
        src: 'https://any-domain.ru/img/any-img.jpg',
      },
    });

    const checkURL = vi.spyOn(self, 'checkURL');

    vi.runOnlyPendingTimers();

    expect(checkURL).not.toHaveBeenCalled();

    expect(wrapper.get('.app-img').element.src).toBe('https://any-domain.ru/img/any-img.jpg');

    await wrapper.setProps({
      src: 'https://vitest.io/',
    });

    expect(checkURL).toHaveBeenCalledTimes(1);

    vi.runOnlyPendingTimers();

    expect(wrapper.get('.app-img').element.src).toBe('https://vitest.io/');
  });
});

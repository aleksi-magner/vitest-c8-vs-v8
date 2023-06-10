import type { App } from 'vue';

declare global {
  type VueApp = App<Element>;

  type BaseState = {
    loading: boolean;
    componentsWithLoading: Array<number | string>;
  };
}

export {};

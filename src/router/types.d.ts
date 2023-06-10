import type { NavigationGuardWithThis } from 'vue-router';

declare global {
  type RouteLocationNormalized = import('vue-router').RouteLocationNormalized;

  type RouteRecordRaw = import('vue-router').RouteRecordRaw;

  type RouteLocationRaw = import('vue-router').RouteLocationRaw;

  type BeforeEnter = undefined | NavigationGuardWithThis<undefined>;

  type NavigationGuardNext = import('vue-router').NavigationGuardNext;

  type Router = import('vue-router').Router;
}

export {};

import { createRouter, createWebHistory } from 'vue-router';

import routes from '@/router/routes';

// For App
export const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void => {
    next(from.fullPath !== to.fullPath);
  },
);

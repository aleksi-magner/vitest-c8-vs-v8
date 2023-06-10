const routes: readonly RouteRecordRaw[] = [
  {
    name: 'registration',
    path: '/registration',
    component: () => import('@/views/AnyPage.vue'),
  },
  {
    name: 'messages',
    path: '/messages',
    component: () => import('@/views/AnyPage.vue'),
  },
  {
    name: 'shifts',
    path: '/shifts',
    component: () => import('@/views/AnyPage.vue'),
  },
  {
    name: 'info',
    path: '/info',
    component: () => import('@/views/AnyPage.vue'),
  },
  {
    name: 'any',
    path: '/any',
    component: () => import('@/views/AnyPage.vue'),
  },
  {
    name: 'root',
    path: '/',
    redirect: {
      name: 'any',
      params: {},
    },
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'any',
      params: {},
    },
  },
];

export default routes;

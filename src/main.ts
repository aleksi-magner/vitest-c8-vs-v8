import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initDatabase } from 'purejs-idb';

import { router } from '@/router';

import 'vi-icons/icons.css';
import '@/assets/main.css';

import Main from '@/App.vue';
import InitError from '@/views/InitError.vue';

initDatabase('store', 'db')
  .then((): void => {
    const app: VueApp = createApp(Main);

    app.use(createPinia());
    app.use(router);

    app.mount('#app');
  })
  .catch((): void => {
    const app: VueApp = createApp(InitError);

    app.mount('#app');
  });

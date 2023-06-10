<template>
  <AppLoader v-if="loading" />

  <Component v-if="isBaseDataLoaded" :is="layout" />
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapState, mapActions } from 'pinia';

import { useBaseStore } from '@/stores';

import AppLoader from '@/UI/Loader.vue';

export default {
  name: 'App',
  components: {
    AppLoader,
    MainLayout: defineAsyncComponent(() => import('@/layouts/MainLayout.vue')),
  },
  data: () => ({
    isBaseDataLoaded: false,
  }),
  computed: {
    ...mapState(useBaseStore, {
      loading: 'loading',
    }),
    layout() {
      return 'MainLayout';
    },
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(useBaseStore, {
      startLoading: 'startLoading',
      endLoading: 'endLoading',
    }),
    init() {
      this.startLoading(this.$.uid);

      this.isBaseDataLoaded = true;

      this.endLoading(this.$.uid);
    },
  },
};
</script>

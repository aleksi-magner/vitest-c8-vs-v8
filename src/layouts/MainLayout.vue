<template>
  <TopBar />

  <main class="app__body text-body">
    <div class="app__body-toolbar-wrap" data-teleport-tabs></div>
    <div class="app__body-toolbar-wrap" data-teleport-toolbar></div>

    <div class="app__body-content-wrap">
      <section
        class="app__body-content"
        :class="{
          'app__body-content--fill': fill,
        }"
      >
        <RouterView />
      </section>
    </div>
  </main>

  <BottomNavigation />
</template>

<script>
import TopBar from '@/layouts/TopBar.vue';
import BottomNavigation from '@/layouts/BottomNavigation.vue';

export default {
  name: 'MainLayout',
  components: {
    TopBar,
    BottomNavigation,
  },
  provide() {
    return {
      setFill: this.setFill,
    };
  },
  data: () => ({
    fill: false,
  }),
  methods: {
    setFill(fill) {
      this.fill = fill;
    },
  },
};
</script>

<template>
  <footer class="app__bottom-bar-wrap">
    <div class="app__bottom-bar">
      <div
        v-for="item in navigation"
        :key="item.link"
        class="bottom-navigation__item"
        :class="{
          'bottom-navigation__item--compact': isExtraSmall,
          'bottom-navigation__item--active': item.active,
        }"
        data-test="navigation-item"
      >
        <AppBadge :count="item.counter" x="70%">
          <AppIcon :icon="item.icon" size="lg" />
        </AppBadge>

        <span
          v-if="!isExtraSmall || item.active"
          class="bottom-navigation__text text-truncate"
          data-test="navigation-title"
        >
          {{ item.title }}
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
import AppBadge from '@/UI/Badge.vue';
import AppIcon from '@/UI/Icon.vue';

export default {
  name: 'BottomNavigation',
  components: {
    AppBadge,
    AppIcon,
  },
  emits: ['change'],
  data: () => ({
    isExtraSmall: false,
  }),
  computed: {
    navigation() {
      const activeLink = this.$route.name;

      return [
        {
          icon: 'key',
          title: 'Registration',
          link: 'registration',
          active: false,
          counter: 0,
        },
        {
          icon: 'popup',
          title: 'Messages',
          link: 'messages',
          active: activeLink === 'messages',
          counter: 1,
        },
        {
          icon: 'calendar',
          title: 'Shifts',
          link: 'shifts',
          active: activeLink === 'shifts',
          counter: 0,
        },
        {
          icon: 'info',
          title: 'Info',
          link: 'info',
          active: activeLink === 'info',
          counter: 0,
        },
      ];
    },
  },
  created() {
    this.checkNavigationSize();

    window.addEventListener('resize', this.checkNavigationSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkNavigationSize);
  },
  methods: {
    checkNavigationSize() {
      const defaultWidth = 80 * this.navigation.length;

      this.isExtraSmall = window.innerWidth < defaultWidth;
    },
  },
};
</script>

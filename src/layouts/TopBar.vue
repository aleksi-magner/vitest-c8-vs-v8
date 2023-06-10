<template>
  <header class="app__top-bar-wrap">
    <div class="app__top-bar">
      <div class="d-flex align-center cursor-pointer" data-test="user">
        <AppBadge :count="counter" x="-2px" y="130%">
          <div class="user-avatar">
            <AppImg :src="emptyAvatar" alt="new user" />
          </div>
        </AppBadge>

        <div class="d-flex flex-column justify-center align-center">
          <span class="text-body lh-25" data-test="name">Your profile</span>

          <span class="text-description lh-15 text-primary" data-test="description">
            not verified
          </span>
        </div>

        <AppIcon class="ml-2" color="muted" icon="angle-right" />
      </div>
    </div>
  </header>
</template>

<script>
import emptyAvatar from '@/assets/img/empty-avatar.png';

import AppImg from '@/UI/Img.vue';
import AppIcon from '@/UI/Icon.vue';
import AppBadge from '@/UI/Badge.vue';

export default {
  name: 'TopBar',
  components: {
    AppImg,
    AppIcon,
    AppBadge,
  },
  computed: {
    emptyAvatar() {
      return emptyAvatar;
    },
    counter() {
      const counter = [0, 1, 2].reduce((a, b) => a + b, 0);

      return counter > 99 ? '99+' : String(counter);
    },
  },
};
</script>

<style scoped>
.user-avatar {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 8px 0 0;
  padding: 0;
  width: 36px;
  height: 36px;
  font-size: 1rem;
  line-height: 1;
  color: var(--base);
  border-radius: var(--border-radius);
  background-color: var(--border-color);
  box-sizing: border-box;
}
</style>

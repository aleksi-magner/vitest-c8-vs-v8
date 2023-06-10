<template>
  <div class="app-badge__wrap">
    <slot />

    <span
      v-if="count"
      class="app-badge"
      :class="{
        'app-badge--priority': type === 'priority',
      }"
      :style="position"
      role="status"
      data-test="badge-count"
    >
      {{ count }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'AppBadge',
  props: {
    count: {
      type: [Number, String],
      default: 0,
    },
    type: {
      type: String,
      default: '',
      validator: value => ['', 'priority'].includes(value),
    },
    x: {
      type: String,
      default: '',
    },
    y: {
      type: String,
      default: '',
    },
  },
  computed: {
    position() {
      if (!this.count) {
        return '';
      }

      const position = [];

      if (this.x) {
        position.push(`--badge-x: ${this.x}`);
      }

      if (this.y) {
        position.push(`--badge-y: ${this.y}`);
      }

      return position.join('; ');
    },
  },
};
</script>

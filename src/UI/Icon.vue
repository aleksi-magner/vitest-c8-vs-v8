<template>
  <i
    v-if="icon"
    class="vi"
    :class="classes"
    :style="styles"
    aria-hidden="true"
    data-test="icon"
    @click="click()"
  ></i>
</template>

<script>
import { getColor } from '@/services/helpers';

export default {
  name: 'AppIcon',
  props: {
    color: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  computed: {
    iconColor() {
      return getColor(this.color);
    },
    iconSize() {
      switch (this.size) {
        case 'sm':
          return 'icon-sm';
        case '1x':
          return 'icon-1x';
        case 'lg':
          return 'icon-lg';
        case '2x':
          return 'icon-2x';
        case '3x':
          return 'icon-3x';
        case 'logo':
          return 'icon-big-logo';
        default:
          return '';
      }
    },
    iconDisabled() {
      return this.disabled ? 'vi--disabled' : '';
    },
    classes() {
      return [`vi-${this.icon || ''}`, this.iconColor, this.iconSize, this.iconDisabled]
        .filter(Boolean)
        .join(' ');
    },
    styles() {
      if (this.iconColor === 'text-custom') {
        return `--custom-color: ${this.color}`;
      }

      return '';
    },
  },
  methods: {
    click() {
      if (this.disabled) {
        return;
      }

      this.$emit('click');
    },
  },
};
</script>

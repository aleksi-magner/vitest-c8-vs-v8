<template>
  <div
    class="app-image__wrap"
    :class="{
      loader: loading,
      'app-image__aspect-ratio': aspectRatio,
    }"
  ></div>
</template>

<script>
import placeholder from '@/assets/img/image-placeholder.png';

export default {
  name: 'AppImg',
  props: {
    width: {
      type: [Number, String],
      default: 0,
    },
    aspectRatio: {
      type: [Number, String],
      default: 0,
    },
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: 'App image',
    },
  },
  emits: ['loading'],
  data: () => ({
    loading: false,
  }),
  watch: {
    src() {
      this.checkURL();
    },
  },
  created() {
    this.$emit('loading', false);

    this.checkURL();
  },
  methods: {
    checkURL() {
      this.$emit('loading', true);

      this.loading = true;

      const img = document.createElement('img');

      img.className = 'app-img';

      const width = Number.parseInt(this.width, 10);
      const imgWidth = width ? `${width}px` : '100%';

      img.setAttribute('width', imgWidth);
      img.setAttribute('src', this.src);
      img.setAttribute('alt', this.alt);

      img.onload = () => {
        if (this.aspectRatio) {
          const offsetWidth = width || this.$parent.$el.offsetWidth || document.body.offsetWidth;

          const aspectRatio = Number.parseFloat(this.aspectRatio);

          img.style.height = `${offsetWidth / aspectRatio}px`;
        }

        this.$el.innerHTML = '';

        this.$el.appendChild(img);

        this.loading = false;

        this.$emit('loading', false);
      };

      img.onerror = () => {
        img.setAttribute('src', placeholder);
      };
    },
  },
};
</script>

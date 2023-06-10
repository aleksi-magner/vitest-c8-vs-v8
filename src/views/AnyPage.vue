<template>
  <p class="px-3 py-6">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet animi dignissimos dolor
    dolorem expedita omnis quidem sunt voluptatem voluptatibus? Atque cupiditate debitis est fugit
    laboriosam minus reiciendis reprehenderit, tenetur.
  </p>
</template>

<script>
export default {
  name: 'AnyPage',
  inject: {
    setFillMainLayout: {
      from: 'setFill',
    },
  },
  created() {
    this.setFillMainLayout(true);
  },
  beforeUnmount() {
    this.setFillMainLayout(false);
  },
};
</script>

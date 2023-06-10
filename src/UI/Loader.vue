<template>
  <div class="app__loader-bg">
    <div class="app__loader-wrap" role="status">
      <span class="app__loader-item"></span>
      <span class="app__loader-item"></span>
      <span class="app__loader-item"></span>
      <span class="app__loader-item"></span>
      <span class="app__loader-item"></span>
      <span class="app__loader-item"></span>
      <span class="app__loader-item"></span>
      <span class="app__loader-item"></span>
      <span class="app__loader-item"></span>
      <span class="app__loader-item"></span>
      <span class="app__loader-item"></span>
      <span class="app__loader-item"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLoader',
  created() {
    document.body.style.overflow = 'hidden';
  },
  beforeUnmount() {
    document.body.style.overflow = '';
  },
};
</script>

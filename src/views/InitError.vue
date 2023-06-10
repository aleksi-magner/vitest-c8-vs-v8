<template>
  <main class="app__body text-body">
    <div class="app__body-content-wrap">
      <section class="app__body-content app__body-content--center py-6">
        <p>An error occurred while initializing the application.</p>
        <p>IndexedDB local storage is not supported or blocked.</p>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  name: 'InitError',
};
</script>

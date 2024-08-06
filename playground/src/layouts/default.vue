<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <main
    text="center gray-700 dark:gray-200" h-full w-full rounded-3xl font-sans
  >
    <RouterLink v-if="route.path !== '/'" position="absolute top-10 left-10" text-2xl icon-btn to="/example" title="Home">
      <div i-carbon-home />
    </RouterLink>
    <RouterView />
  </main>
</template>

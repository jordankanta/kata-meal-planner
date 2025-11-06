<template>
  <div class="home-page min-h-screen bg-gray-50">
    <AppHeader />
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'

// Set up page metadata
useHead({
  title: 'Home - MealPrep',
  meta: [
    {
      name: 'description',
      content: 'Plan your daily and weekly meals with MealPrep'
    }
  ]
})

// Responsive breakpoints using VueUse
const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  xl: 1280
})

// Check if we're on mobile (< 768px)
const isMobile = breakpoints.smaller('tablet')
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.mobile-view,
.desktop-view {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ensure smooth transitions between views */
@media (min-width: 768px) {
  .container {
    max-width: 1400px;
  }
}
</style>

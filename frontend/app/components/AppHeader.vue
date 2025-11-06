<template>
  <header class="app-header bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Title -->
        <div class="flex items-center space-x-3">
          <div class="logo">
            <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">
            MealPrep
          </h1>
        </div>

        <!-- Navigation - Desktop -->
        <nav class="hidden md:flex items-center space-x-1">
          <NuxtLink
            v-for="tab in navigationTabs"
            :key="tab.name"
            :to="tab.path"
            class="nav-tab px-4 py-2 rounded-md text-sm font-medium transition-colors"
            :class="isActiveTab(tab.path)
              ? 'bg-primary/10 text-primary'
              : 'text-gray-600 hover:text-primary hover:bg-gray-50'"
          >
            {{ tab.name }}
          </NuxtLink>
        </nav>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Notification Bell -->
          <button
            class="p-2 text-gray-600 hover:text-primary transition-colors relative"
            aria-label="Notifications"
            @click="handleNotifications"
          >
            <BellIcon class="w-6 h-6" />
            <span
              v-if="hasNotifications"
              class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
            />
          </button>

          <!-- Profile Picture -->
          <button
            class="profile-button flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="User profile"
            @click="handleProfile"
          >
            <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <UserIcon class="w-5 h-5 text-primary" />
            </div>
          </button>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            aria-label="Toggle menu"
            @click="toggleMobileMenu"
          >
            <Bars3Icon v-if="!mobileMenuOpen" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <nav v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200">
          <NuxtLink
            v-for="tab in navigationTabs"
            :key="tab.name"
            :to="tab.path"
            class="block px-4 py-3 text-base font-medium transition-colors"
            :class="isActiveTab(tab.path)
              ? 'bg-primary/10 text-primary'
              : 'text-gray-600 hover:text-primary hover:bg-gray-50'"
            @click="mobileMenuOpen = false"
          >
            {{ tab.name }}
          </NuxtLink>
        </nav>
      </Transition>
    </div>
  </header>

  <!-- Spacer to prevent content from hiding under fixed header -->
  <div class="h-16" />
</template>

<script setup lang="ts">
import { BellIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

interface NavigationTab {
  name: string
  path: string
}

const route = useRoute()
const mobileMenuOpen = ref(false)
const hasNotifications = ref(false) // TODO: Connect to notification system

const navigationTabs: NavigationTab[] = [
  { name: 'Home', path: '/' },
  { name: 'Recipes', path: '/recipes' },
  { name: 'Grocery List', path: '/grocery-list' },
  { name: 'Settings', path: '/settings' }
]

const isActiveTab = (path: string): boolean => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleNotifications = () => {
  // TODO: Open notifications panel/modal
  console.log('Notifications clicked')
}

const handleProfile = () => {
  // TODO: Navigate to profile or open profile menu
  console.log('Profile clicked')
  navigateTo('/profile')
}

// Close mobile menu when route changes
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<style scoped>
.app-header {
  backdrop-filter: blur(10px);
}

.nav-tab {
  white-space: nowrap;
}

.profile-button {
  -webkit-tap-highlight-color: transparent;
}
</style>

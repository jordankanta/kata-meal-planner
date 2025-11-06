// Test setup file
import { config } from '@vue/test-utils'

// Global test setup
config.global.stubs = {
  // Stub Nuxt components that might cause issues in tests
  NuxtLink: true,
  NuxtPage: true
}

// Mock useRuntimeConfig
global.useRuntimeConfig = () => ({
  public: {
    apiBaseUrl: 'http://localhost:8000'
  }
})

// Mock navigateTo
global.navigateTo = vi.fn()

// Mock useHead
global.useHead = vi.fn()

// Import vi from vitest
import { vi } from 'vitest'

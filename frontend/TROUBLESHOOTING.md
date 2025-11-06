# Troubleshooting Guide - White Page Issue

## Quick Fixes

### 1. Restart the Dev Server

The most common cause is that the dev server needs to be restarted after adding new dependencies or components.

```bash
# Stop the current server (Ctrl+C if running)
cd frontend

# Clear Nuxt cache
rm -rf .nuxt node_modules/.vite

# Restart
npm run dev
```

### 2. Check Browser Console

Open your browser's Developer Tools (F12) and check the Console tab for JavaScript errors:
- Red error messages indicate what's breaking
- Look for "Cannot find module" or "is not defined" errors

### 3. Check Terminal Output

Look at the terminal where `npm run dev` is running:
- Look for TypeScript errors
- Check for module resolution errors
- Verify the server actually started on port 3000

### 4. Verify Dependencies

```bash
cd frontend
npm install
```

## Common Issues & Solutions

### Issue 1: Pinia Store Not Found

**Symptom:** Error mentioning `useMealPlanStore` is not defined

**Solution:**
```bash
# Make sure Pinia module is properly installed
npm install @pinia/nuxt
```

Check that `nuxt.config.ts` includes:
```typescript
modules: [
  '@pinia/nuxt',
  '@nuxtjs/tailwindcss'
]
```

### Issue 2: Auto-Import Not Working

**Symptom:** Components not found errors

**Solution:**
1. Restart the dev server
2. Delete `.nuxt` directory: `rm -rf .nuxt`
3. Restart: `npm run dev`

### Issue 3: Tailwind CSS Not Loading

**Symptom:** No styling visible

**Solution:**
```bash
# Ensure Tailwind is installed
npm install -D @nuxtjs/tailwindcss tailwindcss postcss autoprefixer

# Restart dev server
npm run dev
```

### Issue 4: TypeScript Errors

**Symptom:** White page with TypeScript compilation errors in terminal

**Solution:**
Check `tsconfig.json` is properly configured. Run:
```bash
npm run postinstall
```

This regenerates Nuxt's TypeScript configuration.

### Issue 5: SSR/Hydration Errors

**Symptom:** Errors mentioning "hydration" or SSR

**Solution:**
The components use SSR-safe patterns now, but if you see hydration errors:
1. Check for `window` or `document` usage in `<script setup>`
2. Wrap client-only code with `onMounted()`

## Step-by-Step Debugging

### Step 1: Test with Simple Page

Replace `pages/index.vue` temporarily with:

```vue
<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold">Test Page</h1>
    <p>If you see this, the basic setup works!</p>
  </div>
</template>

<script setup>
console.log('Page loaded')
</script>
```

If this works, the issue is in the components.

### Step 2: Add Components One by One

Start with just the header:

```vue
<template>
  <div>
    <AppHeader />
    <div class="p-8">
      <h1>Testing...</h1>
    </div>
  </div>
</template>
```

If this fails, the issue is in `AppHeader.vue`.

### Step 3: Check Store Initialization

Add console.log to verify store loads:

```vue
<script setup>
const mealPlanStore = useMealPlanStore()
console.log('Store loaded:', mealPlanStore)
</script>
```

### Step 4: Check Breakpoints

Test if `@vueuse/core` is causing issues:

```vue
<script setup>
// Temporarily replace useBreakpoints
const isMobile = ref(window.innerWidth < 768)
</script>
```

## Manual Fix: Rebuild Everything

If all else fails:

```bash
cd frontend

# Remove everything
rm -rf node_modules .nuxt .output package-lock.json

# Reinstall
npm install

# Clear cache
npx nuxi cleanup

# Start fresh
npm run dev
```

## Check Your Environment

### Required Node Version
Nuxt 4 requires Node.js >= 20.19.0 or >= 22.12.0

Check your version:
```bash
node --version
```

If it's older, update Node.js or use nvm:
```bash
nvm install 20.19.0
nvm use 20.19.0
```

### Port 3000 Already in Use?

If another process is using port 3000:
```bash
# Kill the process
npx kill-port 3000

# Or use a different port
npm run dev -- --port 3001
```

## Still Not Working?

### Enable Debug Mode

Add to `nuxt.config.ts`:
```typescript
export default defineNuxtConfig({
  // ... existing config
  debug: true,
  devtools: { enabled: true }
})
```

### Check Nuxt DevTools

Open Nuxt DevTools in the browser (icon in bottom corner) and:
1. Check the "Components" tab to see if components are registered
2. Check the "Routes" tab to verify routing
3. Look at the "Payload" tab for SSR issues

### Get Error Details

Add error handling to `app.vue`:

```vue
<template>
  <div id="app">
    <NuxtErrorBoundary>
      <NuxtPage />
      <template #error="{ error }">
        <div class="p-8 bg-red-50">
          <h1 class="text-2xl font-bold text-red-900">Error</h1>
          <pre class="mt-4 text-sm">{{ error }}</pre>
        </div>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
```

This will show error details instead of a white page.

## Report Issue

If none of these solutions work, please provide:
1. Node.js version (`node --version`)
2. npm version (`npm --version`)
3. Full terminal output from `npm run dev`
4. Browser console errors (screenshot)
5. Any error details from Nuxt DevTools

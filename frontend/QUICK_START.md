# Quick Start - Get the App Running

## The White Page Fix

Based on your issue, here's the fastest way to get the app running:

### 1. Stop Everything and Clean

```bash
cd frontend

# Stop the dev server if running (Ctrl+C)

# Clean everything
rm -rf .nuxt node_modules/.vite .output

# Reinstall dependencies
npm install
```

### 2. Start Dev Server

```bash
npm run dev
```

Wait for the message: `✔ Nuxt DevTools is enabled`

Then open: http://localhost:3000

### 3. Check for Errors

**In the terminal:** Look for red error messages

**In the browser:**
- Press F12 to open Developer Tools
- Click the "Console" tab
- Look for red error messages

### Common Error #1: "Cannot find module @pinia/nuxt"

**Fix:**
```bash
npm install @pinia/nuxt @nuxtjs/tailwindcss
npm run dev
```

### Common Error #2: Node version too old

**Check version:**
```bash
node --version
```

**If < 20.19.0:** Update Node.js first

### Common Error #3: Port 3000 already in use

**Fix:**
```bash
npx kill-port 3000
npm run dev
```

## Test with Minimal Page

If the above doesn't work, test with a minimal page:

1. **Rename the current page:**
```bash
mv pages/index.vue pages/index.backup.vue
```

2. **Create a simple test page:**
```bash
cat > pages/index.vue << 'EOF'
<template>
  <div class="p-8">
    <h1 class="text-4xl font-bold text-orange-500">
      MealPrep is Working! 🎉
    </h1>
    <p class="mt-4 text-gray-600">
      If you can see this, your Nuxt app is running correctly.
    </p>
  </div>
</template>

<script setup>
useHead({ title: 'MealPrep - Test' })
</script>
EOF
```

3. **Restart dev server:**
```bash
npm run dev
```

4. **Visit:** http://localhost:3000

If you see "MealPrep is Working!" then the basic setup is fine, and we need to debug the full components.

5. **Restore the full page:**
```bash
mv pages/index.backup.vue pages/index.vue
```

## What Should Happen

When working correctly, you should see:

**Mobile view (< 768px):**
- Header with MealPrep logo
- "Daily Digest" title
- Empty state: "No meals planned for today"

**Desktop view (≥ 768px):**
- Header
- Calendar on the left
- Meal table in the center
- Quick actions and upcoming meals on the right

## Screenshot the Error

If you still see a white page:

1. Open Developer Tools (F12)
2. Go to Console tab
3. Screenshot any errors
4. In terminal, screenshot the output
5. Share both screenshots

## Alternative: Run with Docker

If local development is problematic:

```bash
cd /Users/jordan/Developpement/AIDD/kata-meal-planner
docker-compose up frontend
```

Then visit: http://localhost:3000

## Need Help?

Share:
- Output from `npm run dev`
- Browser console errors
- Node version: `node --version`
- npm version: `npm --version`

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen p-6 transition-colors bg-white dark:bg-zinc-900 text-black dark:text-white">
    <h1 class="text-2xl font-bold mb-4">
      🎛️ Dark Mode mit VueUse
    </h1>
    <button @click="toggleDark()" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
      🌗 Toggle Dark Mode
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['search'])
const searchQuery = ref('')

const handleSubmit = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim())
    searchQuery.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mb-8">
    <div class="relative max-w-md mx-auto">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for a city..."
        class="w-full px-6 py-3 rounded-full dark:bg-gray-800/50 bg-white/50 backdrop-blur-lg dark:text-white text-gray-900 dark:placeholder-gray-400 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
      />
      <button
        type="submit"
        class="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full dark:bg-gray-700/50 bg-white/50 dark:text-white text-gray-900 dark:hover:bg-gray-600/50 hover:bg-white/70 transition-all duration-300"
      >
        Search
      </button>
    </div>
  </form>
</template>
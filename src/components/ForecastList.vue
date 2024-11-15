<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'

const props = defineProps<{
  forecast: any[]
}>()

const formatTime = (dt: number) => format(new Date(dt * 1000), 'ha')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
    <div
      v-for="item in forecast"
      :key="item.dt"
      class="dark:bg-gray-800/50 bg-white/50 backdrop-blur-lg rounded-xl p-4 transform hover:scale-105 transition-all duration-300"
    >
      <p class="dark:text-white text-gray-900 text-center font-bold">{{ formatTime(item.dt) }}</p>
      <img
        :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
        :alt="item.weather[0].description"
        class="w-16 h-16 mx-auto"
      />
      <p class="dark:text-white text-gray-900 text-center text-2xl font-bold">
        {{ Math.round(item.main.temp) }}°C
      </p>
      <p class="dark:text-gray-300 text-gray-700 text-center text-sm">
        {{ item.weather[0].description }}
      </p>
    </div>
  </div>
</template>
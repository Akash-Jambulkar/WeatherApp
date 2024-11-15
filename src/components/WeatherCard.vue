<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'

const props = defineProps<{
  weather: any
}>()

const temperature = computed(() => Math.round(props.weather.main.temp))
const feelsLike = computed(() => Math.round(props.weather.main.feels_like))
const weatherIcon = computed(() => 
  `https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@4x.png`
)
</script>

<template>
  <div class="bg-white/20 dark:bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 mb-8 transform hover:scale-102 transition-all duration-300">
    <div class="flex flex-col md:flex-row items-center justify-between">
      <div class="dark:text-white text-gray-900">
        <h2 class="text-3xl font-bold mb-2">{{ weather.name }}, {{ weather.sys.country }}</h2>
        <p class="text-xl">{{ format(new Date(), 'EEEE, MMMM do, yyyy') }}</p>
        <div class="mt-4">
          <p class="text-6xl font-bold">{{ temperature }}°C</p>
          <p class="text-xl">Feels like: {{ feelsLike }}°C</p>
        </div>
      </div>
      
      <div class="weather-icon-container">
        <img 
          :src="weatherIcon" 
          :alt="weather.weather[0].description"
          class="w-32 h-32 object-contain animate-float"
        />
        <p class="dark:text-white text-gray-900 text-xl capitalize">{{ weather.weather[0].description }}</p>
      </div>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      <div class="dark:text-white text-gray-900 text-center p-4 dark:bg-gray-700/50 bg-white/30 rounded-xl">
        <p class="text-sm">Humidity</p>
        <p class="text-2xl font-bold">{{ weather.main.humidity }}%</p>
      </div>
      <div class="dark:text-white text-gray-900 text-center p-4 dark:bg-gray-700/50 bg-white/30 rounded-xl">
        <p class="text-sm">Wind Speed</p>
        <p class="text-2xl font-bold">{{ weather.wind.speed }} m/s</p>
      </div>
      <div class="dark:text-white text-gray-900 text-center p-4 dark:bg-gray-700/50 bg-white/30 rounded-xl">
        <p class="text-sm">Pressure</p>
        <p class="text-2xl font-bold">{{ weather.main.pressure }} hPa</p>
      </div>
      <div class="dark:text-white text-gray-900 text-center p-4 dark:bg-gray-700/50 bg-white/30 rounded-xl">
        <p class="text-sm">Visibility</p>
        <p class="text-2xl font-bold">{{ weather.visibility / 1000 }} km</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
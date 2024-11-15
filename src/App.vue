<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { format } from 'date-fns'
import axios from 'axios'
import WeatherCard from './components/WeatherCard.vue'
import SearchBar from './components/SearchBar.vue'
import ForecastList from './components/ForecastList.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import ThemeToggle from './components/ThemeToggle.vue'

const API_KEY = '1635890035cbba097fd5c26c8ea672a1'
const weather = ref(null)
const forecast = ref([])
const loading = ref(false)
const error = ref('')

const fetchWeather = async (city: string) => {
  try {
    loading.value = true
    error.value = ''
    
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
    
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    )
    
    weather.value = weatherResponse.data
    forecast.value = forecastResponse.data.list
      .filter((item: any, index: number) => index < 5)
  } catch (e: any) {
    if (e.response?.status === 404) {
      error.value = 'City not found. Please try again.'
    } else if (e.response?.status === 429) {
      error.value = 'Too many requests. Please try again later.'
    } else {
      error.value = 'An error occurred. Please try again.'
    }
    weather.value = null
    forecast.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchWeather('London')
})
</script>

<template>
  <div class="min-h-screen transition-colors duration-300 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 bg-gradient-to-br from-blue-100 to-purple-100 p-8">
    <div class="max-w-4xl mx-auto">
      <ThemeToggle />
      <h1 class="text-4xl font-bold dark:text-white text-gray-900 text-center mb-8">Weather App</h1>
      
      <SearchBar @search="fetchWeather" />
      
      <div v-if="error" class="text-red-200 text-center my-4 p-4 bg-red-500/20 backdrop-blur-lg rounded-lg">
        {{ error }}
      </div>
      
      <LoadingSpinner v-if="loading" />
      
      <template v-else-if="weather">
        <WeatherCard :weather="weather" />
        <ForecastList :forecast="forecast" />
      </template>
    </div>
  </div>
</template>
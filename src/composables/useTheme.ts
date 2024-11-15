import { ref, watch } from 'vue'
import { usePreferredDark } from '@vueuse/core'

export function useTheme() {
  const isDark = ref(localStorage.getItem('theme') === 'dark' || usePreferredDark().value)
  
  watch(isDark, (newValue) => {
    localStorage.setItem('theme', newValue ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newValue)
  }, { immediate: true })
  
  return {
    isDark,
    toggleTheme: () => isDark.value = !isDark.value
  }
}
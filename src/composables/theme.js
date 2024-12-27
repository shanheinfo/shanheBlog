import { ref, computed, watch } from 'vue'

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'light')

  const themeIcon = computed(() => {
    return theme.value === 'dark' ? 'fas fa-sun' : 'fas fa-moon'
  })

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', theme.value)
  }

  watch(theme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
  }, { immediate: true })

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      theme.value = e.matches ? 'dark' : 'light'
    }
  })

  return { theme, themeIcon, toggleTheme }
} 
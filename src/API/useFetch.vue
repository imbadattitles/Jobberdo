<script>
import { ref } from 'vue'

export const useFetch = (callback) => {
  const isLoading = ref(false)
  const error = ref(null)
  const fetching = async (...args) => {
    try {
      isLoading.value = true
      await callback(...args)
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }
  return [fetching, isLoading, error]
}
</script>

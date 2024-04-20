<script setup>
import { onMounted, ref } from 'vue'
import config from '../../config'
const googleLink = ref(null)
const getLink = async () => {
  const res = await fetch(config.backendUrl + `api/v1/security/auth/login/google/ref`).then(
    (response) => {
      if (response.status === 200) {
        return response.json()
      }
    }
  )
  googleLink.value = res.data.auth_ref
}
onMounted(() => {
  getLink()
})
</script>
<template>
  <a :href="googleLink" class="googleBtn"><span />Continue with Google</a>
</template>
<style scoped>
.googleBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  cursor: pointer;
  gap: 8px;
  padding: 9px;
  width: 100%;
  font-size: 20px;
  font-family: Segoe UI;
  border-radius: 8px;
  color: #4e4e4e;
  font-weight: 600;
  border: 2px solid #4e4e4e;
  span {
    width: 32px;
    height: 32px;
    background-size: contain;
    background-image: url('/login/google.svg');
    background-repeat: no-repeat;
    @media (max-width: 600px) {
      width: 24px;
      height: 24px;
    }
  }
  @media (max-width: 600px) {
    font-size: 16px;
    padding: 6px;
    border: 1px solid #4e4e4e;
  }
}
</style>

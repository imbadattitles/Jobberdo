<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import { onMounted } from 'vue'
import presign from './API/presign'
import refreshToken from './API/refreshToken'
onMounted(() => {
  if (localStorage.getItem('refresh_token')) {
    refreshToken()
  } else {
    presign('web')
  }
})
</script>

<template>
  <HeaderComponent />
  <RouterView />
  <FooterComponent />
</template>

<style scoped></style>

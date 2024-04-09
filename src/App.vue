<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import { onMounted } from 'vue'
import presign from './API/presign'
onMounted(() => {
  presign('web')
})
</script>

<template>
  <HeaderComponent />
  <RouterView />
  <FooterComponent />
</template>

<style scoped></style>

<script setup>
import CreateAccountModal from '@/views/CreateAccountModal.vue'
import LoginComponent from './LoginComponent.vue'
defineProps(['openModal'])
const emit = defineEmits(['modalChange'])
const close = (e) => {
  e.stopPropagation()
  emit('modalChange', false)
}
</script>
<template>
  <div @click="close" class="bg">
    <div @click.stop>
      <CreateAccountModal v-if="openModal === 'reg'" />
      <LoginComponent v-if="openModal === 'log'" />
    </div>
  </div>
</template>
<style>
.bg {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

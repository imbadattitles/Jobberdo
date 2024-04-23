<script setup>
import CreateAccountModal from '@/views/CreateAccountModal.vue'
import PasswordRecovery from '@/views/PasswordRecovery.vue'
import LoginComponent from './LoginComponent.vue'
defineProps(['openModal', 'googleQuery'])
const emit = defineEmits(['modalChange'])
const close = (where) => {
  emit('modalChange', where)
}
</script>
<template>
  <div @click="close(false)" class="bg">
    <div @click.stop>
      <CreateAccountModal :changeModal="close" v-if="openModal === 'reg'" />
      <LoginComponent :changeModal="close" v-if="openModal === 'log'" />
      <PasswordRecovery :changeModal="close" v-if="openModal === 'rec'" />
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

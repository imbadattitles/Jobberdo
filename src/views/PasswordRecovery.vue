<script setup>
import NewPasswordCode from '@/components/NewPasswordCode.vue'
import RecoveryMail from '@/components/RecoveryMail.vue'
import RecoveryPassword from '@/components/RecoveryPassword.vue'
import { ref } from 'vue'
defineProps(['changeModal'])
const step = ref(1)
const changeStep = (newStep) => {
  step.value = newStep
}
const registerData = ref({
  email_verification_key: '',
  email: ''
})
const setRegisterData = (data) => {
  registerData.value = data
}
const codeSendLeft = ref(3)
const setSendLeft = (type) => {
  if (type === 'decrement') {
    codeSendLeft.value = codeSendLeft.value - 1
  }
  if (type === 'newCode') {
    codeSendLeft.value = codeSendLeft.value = 3
  }
}
</script>

<template>
  <RecoveryMail
    @setData="setRegisterData"
    :registerData="registerData"
    :changeModal="changeModal"
    @stepAction="changeStep"
    :displayNone="!(step === 1)"
  />
  <NewPasswordCode
    @setData="setRegisterData"
    :registerData="registerData"
    :codeSendLeft="codeSendLeft"
    @setSendLeft="setSendLeft"
    :sendLeft="codeSendLeft"
    :changeModal="changeModal"
    @stepAction="changeStep"
    v-if="step === 2"
  />
  <RecoveryPassword :registerData="registerData" :changeModal="changeModal" v-if="step === 3" />
</template>
<style scoped></style>

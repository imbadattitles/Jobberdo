<script setup>
import CreateAccount from '@/components/CreateAccount.vue'
import CreateAccountChoose from '@/components/CreateAccountChoose.vue'
import CreateAccountCode from '@/components/CreateAccountCode.vue'
import { ref } from 'vue'
defineProps(['changeModal'])
const step = ref(1)
const typeAccount = ref(null)
const setTypeAccount = (type) => {
  typeAccount.value = type
}
const changeStep = (newStep) => {
  step.value = newStep
}
const registerData = ref({
  email_verification_key: '',
  password: '',
  first_name: '',
  last_name: '',
  middle_name: ''
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
  <CreateAccountChoose
    :changeModal="changeModal"
    :activeType="typeAccount"
    @setType="setTypeAccount"
    @stepAction="changeStep"
    v-if="step === 1"
  />
  <CreateAccount
    @setData="setRegisterData"
    :registerData="registerData"
    :changeModal="changeModal"
    @stepAction="changeStep"
    :displayNone="!(step === 2)"
  />
  <CreateAccountCode
    @setData="setRegisterData"
    :registerData="registerData"
    :codeSendLeft="codeSendLeft"
    @setSendLeft="setSendLeft"
    :sendLeft="codeSendLeft"
    :changeModal="changeModal"
    @stepAction="changeStep"
    v-if="step === 3"
  />
</template>
<style scoped></style>

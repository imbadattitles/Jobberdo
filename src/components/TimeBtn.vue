<template>
  <button
    class="formGreen"
    :class="{ time: isButtonDisabled }"
    @click="handleClick('emit')"
    :disabled="isButtonDisabled"
  >
    {{ buttonText }}
    <div v-if="isButtonDisabled" class="timer"><span></span> {{ remainingTime }}</div>
  </button>
</template>

<style scoped>
.formGreen {
  display: flex;
  gap: 16px;
  justify-content: center;
  border-radius: 20px;
  border: 2px solid #46753e;
  background: #5fa55c;
  transition: 0.2s;
  color: white;
  padding: 12px 48px;
  font-size: 20px;
  font-weight: 600;
  font-family: Segoe UI;
  cursor: pointer;
  transition: 0.2s;
  line-height: 120%;
  width: auto;
  &.time {
    opacity: 0.5;
  }
  &:hover {
    box-shadow: 0px 4px 13.7px 0px rgba(0, 0, 0, 0.25) inset;
  }
  @media (max-width: 600px) {
    font-size: 16px;
    padding: 12px 40px;
  }
}
.timer {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: Segoe UI;
  gap: 6px;
  color: white;
  span {
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('/login/time.svg');
  }
}
</style>

<script setup>
import { onMounted, ref } from 'vue'

const isButtonDisabled = ref(false)
const buttonText = ref('Send code again')
const remainingTime = ref('')
const emit = defineEmits(['buttonClick'])

onMounted(() => {
  handleClick('noEmit')
})

const handleClick = (emitOrNot) => {
  isButtonDisabled.value = true
  buttonText.value = 'Send code again'
  let totalTime = 60
  let timeLeft = totalTime

  remainingTime.value = formatTime(timeLeft)

  const timer = setInterval(() => {
    timeLeft--
    remainingTime.value = formatTime(timeLeft)

    if (timeLeft <= 0) {
      clearInterval(timer)
      isButtonDisabled.value = false
      buttonText.value = 'Send code again'
      remainingTime.value = ''
    }
  }, 1000)
  if (emitOrNot === 'emit') {
    emit('buttonClick')
  }
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${padTime(minutes)}:${padTime(remainingSeconds)}`
}

const padTime = (time) => {
  return time < 10 ? `0${time}` : time
}
</script>

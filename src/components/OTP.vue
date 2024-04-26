<template>
  <div class="otpCont" ref="otpCont">
    <input
      type="text"
      class="digit-box"
      v-for="(el, ind) in digits"
      :key="el + ind"
      v-model="digits[ind]"
      :autofocus="ind === 0"
      placeholder="0"
      maxlength="1"
      :disabled="block"
      @keydown="handleKeyDown($event, ind)"
      :class="{ block: block, error: error }"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  default: String,

  digitCount: {
    type: Number,
    required: true
  },
  error: String,
  block: Boolean
})

const digits = reactive([])

if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = props.default.charAt(i)
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = null
  }
}

const otpCont = ref(null)

const emit = defineEmits(['update:otp', 'sendCode'])

const isDigitsFull = function () {
  for (const elem of digits) {
    if (elem == null || elem == undefined) {
      return false
    }
  }

  return true
}

const handleKeyDown = function (event, index) {
  if (event.key !== 'Tab' && event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
    event.preventDefault()
  }

  if (event.key === 'Backspace') {
    digits[index] = null

    if (index != 0) {
      otpCont.value.children[index - 1].focus()
    }

    return
  }

  if (new RegExp('^([0-9])$').test(event.key)) {
    digits[index] = event.key

    if (index != props.digitCount - 1) {
      otpCont.value.children[index + 1].focus()
    }

    if (isDigitsFull()) {
      emit('update:otp', digits.join(''))
      emit('sendCode')
      for (let i = 0; i < props.digitCount; i++) {
        digits[i] = null
      }
      if (!props.block) {
        otpCont.value.children[0].focus()
      }
    }
  }
}
</script>

<style scoped>
.otpCont {
  display: flex;
  gap: 8px;
  @media (max-width: 600px) {
    gap: 4px;
  }
  .digit-box {
    border: 1px solid #4e4e4e;
    width: 53px;
    padding: 4px 16px;
    border-radius: 8px;
    font-size: 36px;
    font-family: Segoe UI;
    font-weight: 600;
    color: #4e4e4e;
    &.error {
      border: 1px solid #ff6464;
    }
    &::placeholder {
      color: #e0e0e0;
    }
    &:focus {
      border: 1px solid #1b1b1b;
    }
    @media (max-width: 600px) {
      font-size: 24px;
      width: 38px;
      padding: 4px 12px;
    }
    &.block {
      opacity: 0.5;
    }
  }
}
</style>

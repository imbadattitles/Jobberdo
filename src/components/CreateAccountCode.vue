<script setup>
import { ref } from 'vue'
import TimeBtn from './TimeBtn.vue'
import emailFetch from '../API/email'
import regFetch from '../API/register'
import codeFetch from '../API/code'
import { useFetch } from '@/API/useFetch.vue'
const code = ref(new Array(6).fill(''))
const handleChange = (e, index) => {
  if (isNaN(e.target.value)) return false
  code.value = [...code.value.map((data, indx) => (indx === index ? e.target.value : data))]
  if (e.target.value && index !== 5) {
    e.target.nextSibling.focus()
  } else {
    sendCode()
  }
}
const emit = defineEmits(['stepAction', 'setData', 'setSendLeft'])
const props = defineProps(['registerData'])

const [againCode, isLoadingAgain, error] = useFetch(async () => {
  try {
    const res = await emailFetch(props.registerData.email)
    emit('setData', {
      ...props.registerData,
      email_verification_key: res.data.key
    })
    emit('setSendLeft', 'newCode')
  } catch (error) {
    throw new Error('error')
  }
})

const [sendCode, isLoadingSendCode, sendCodeError] = useFetch(async () => {
  try {
    const res = await codeFetch(
      props.registerData.email_verification_key,
      code.value[0] + code.value[1] + code.value[2] + code.value[3] + code.value[4] + code.value[5]
    )

    emit('setData', {
      ...props.registerData,
      email_verification_key: res.data.key
    })
    if (res.data.verified) {
      const res = await regFetch(
        props.registerData.email_verification_key,
        props.registerData.password,
        props.registerData.first_name,
        props.registerData.last_name
      )
    }
  } catch (error) {
    emit('setSendLeft', 'decrement')
    throw new Error('error')
  }
})

const handleButtonClick = () => {
  againCode()
}
</script>
<template>
  <div class="block">
    <form class="form">
      <div @click.prevent="$emit('stepAction', 2)" class="back"></div>
      <div class="gap16">
        <p class="form__title">Create account</p>

        <p class="form__text">
          Almost everything, to complete registration, enter the code sent to your email
        </p>
      </div>
      <div class="gap8">
        <div class="codeArea">
          <input
            class="codeArea__input"
            v-for="(data, index) in code"
            maxlength="1"
            placeholder="0"
            :value="data"
            @input="(e) => handleChange(e, index)"
            :key="index"
            type="text"
          />
        </div>
        <p class="error"><span></span>{{ error }} asda</p>
      </div>
      <!-- <button class="formGreen">Sent code again</button> -->
      <div class="mgb">
        <TimeBtn @buttonClick="handleButtonClick" />
      </div>

      <p class="form__text"><span class="form__link">Didn’t get the letter?</span></p>
    </form>
  </div>
</template>
<style scoped>
.back {
  position: absolute;
  top: 13px;
  left: 0px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url('/login/back.svg');
  &:hover {
    opacity: 0.7;
  }
}
.mgb {
  margin-bottom: 22px;
}
.codeArea {
  display: flex;
  gap: 8px;

  &.codeError {
    &.codeArea__input {
      border: 1px solid #ff6464;
    }
  }
  .codeArea__input {
    border: 1px solid #4e4e4e;
    width: 53px;
    padding: 4px 16px;
    border-radius: 8px;
    font-size: 36px;
    font-family: Segoe UI;
    font-weight: 600;
    color: #4e4e4e;
    &::placeholder {
      color: #e0e0e0;
    }
  }
}
.block {
  background: white;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 48px;
  padding: 40px 44px 40px 44px;
  width: 495px;
}
.form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form__title {
  font-size: 36px;
  font-weight: 400;
  font-family: Alata;
  line-height: 120%;
  color: #4e4e4e;
}
.gap16 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
}
.gap8 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 22px;
}
.error {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 14px;
  font-family: Segoe UI;
  font-weight: 400;
  color: #ff6464;
  span {
    width: 18px;
    height: 18px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('/login/error.svg');
  }
}
.form__text {
  font-size: 20px;
  font-family: Segoe UI;
  font-weight: 600;
  color: #4e4e4e;
  a,
  .form__link {
    cursor: pointer;
    color: #5fa55c;
    &:hover {
      color: #457e43;
    }
  }
}
</style>

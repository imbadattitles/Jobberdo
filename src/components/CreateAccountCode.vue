<script setup>
import { ref } from 'vue'
import TimeBtn from './TimeBtn.vue'
import emailFetch from '../API/email'
import regFetch from '../API/register'
import codeFetch from '../API/code'
import { useFetch } from '@/API/useFetch.vue'
import OTP from './OTP.vue'
// const code = ref(new Array(6).fill(''))
// const handleChange = (e, index) => {
//   if (isNaN(e.target.value)) return false
//   code.value = [...code.value.map((data, indx) => (indx === index ? e.target.value : data))]
//   if (e.target.value && index !== 5) {
//     e.target.nextSibling.focus()
//   } else {
//     sendCode()
//   }
// }
const otpValue = ref('')
const emit = defineEmits(['stepAction', 'setData', 'setSendLeft'])
const props = defineProps(['registerData', 'sendLeft', 'changeModal'])

const [againCode] = useFetch(async () => {
  try {
    const res = await emailFetch(props.registerData.email)
    emit('setData', {
      ...props.registerData,
      email_verification_key: res.data.key
    })
    emit('setSendLeft', 'newCode')
    sendCodeError.value = null
  } catch (error) {
    throw new Error('error')
  }
})

const [sendCode, , sendCodeError] = useFetch(async () => {
  try {
    const res = await codeFetch(props.registerData.email_verification_key, otpValue.value)
    emit('setData', {
      ...props.registerData,
      email_verification_key: res.data.key
    })
    if (res.data.verified) {
      regAction()
    }
  } catch (error) {
    emit('setSendLeft', 'decrement')
    console.log(error)
    throw new Error(error.message)
  }
})

const [regAction] = useFetch(async () => {
  try {
    const res = await regFetch(
      props.registerData.email_verification_key,
      props.registerData.password,
      props.registerData.first_name,
      props.registerData.last_name
    )
    alert('успех')
    localStorage.setItem('session_uuid', res.data.session_uuid)
    localStorage.setItem('refresh_token', res.data.refresh_token)
  } catch (error) {
    if (error.message === 'User with this email already exists.') {
      alert('Oops, a user with the same email already exists. Please log in.')
      props.changeModal('log')
    } else {
      alert(error.message)
    }
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
        <!-- <div class="codeArea">
          <input
            class="codeArea__input"
            v-for="(data, index) in code"
            maxlength="1"
            placeholder="0"
            :disabled="sendCode <= 0"
            :value="data"
            @input="(e) => handleChange(e, index)"
            :key="index"
            type="text"
          />
        </div> -->
        <OTP
          :block="sendLeft === 0"
          :error="sendCodeError"
          :digit-count="6"
          @update:otp="otpValue = $event"
          @sendCode="sendCode"
        ></OTP>
        <p v-if="sendCodeError" class="error">
          <span></span>{{ sendCodeError }} {{ sendLeft !== 0 ? `attempts left: ${sendLeft}` : '' }}
        </p>
      </div>
      <div class="mgb">
        <TimeBtn @buttonClick="handleButtonClick" />
      </div>
      <p class="form__text"><span class="form__link">Didn’t get the letter?</span></p>
    </form>
  </div>
</template>
<style scoped>
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
  @media (max-width: 600px) {
    top: 0;
    left: 10px;
  }
}
.mgb {
  margin-bottom: 22px;
}
.codeArea {
  display: flex;
  gap: 8px;
  @media (max-width: 600px) {
    gap: 4px;
  }

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
    @media (max-width: 600px) {
      font-size: 24px;
      width: 38px;
      padding: 4px 12px;
    }
  }
}
.block {
  background: white;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 48px;
  padding: 40px 44px 40px 44px;
  width: 495px;
  @media (max-width: 600px) {
    padding: 40px 28px;
    width: 324px;
  }
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
  @media (max-width: 600px) {
    font-size: 24px;
  }
}
.gap16 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
  @media (max-width: 600px) {
    width: 250px;
    margin-bottom: 26px;
  }
}
.gap8 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 22px;
  @media (max-width: 600px) {
    gap: 4px;
    margin-bottom: 26px;
  }
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
  @media (max-width: 600px) {
    font-size: 16px;
  }
}
</style>

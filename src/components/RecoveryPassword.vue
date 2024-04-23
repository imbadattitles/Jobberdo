<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useFetch } from '@/API/useFetch.vue'
import recoveryPassword from '@/API/recoveryPassword'
import { ref } from 'vue'
const { errors, handleSubmit, defineField, meta } = useForm({
  validationSchema: yup.object({
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(127, 'Max 127 characters')
      .required('Please enter your password.'),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match.')
      .required('Please repeat password.')
  })
})
const emit = defineEmits(['stepAction', 'setData'])
const [sendPassword, isLoading, error] = useFetch(async () => {
  try {
    const res = await recoveryPassword(
      props.registerData.email_verification_key,
      props.registerData.email,
      password.value
    )
    props.changeModal('log')
  } catch (error) {
    throw new Error('error')
  }
})

const onSubmit = handleSubmit(() => {
  sendPassword()
})

const props = defineProps(['changeModal', 'displayNone', 'registerData'])
const [password, passwordAttrs] = defineField('password')
const [repeatPassword, repeatPasswordAttrs] = defineField('repeatPassword')
const typePassword = ref('password')
const typeRepeatPassword = ref('password')
</script>
<template>
  <div class="block">
    <form :class="{ loading: isLoading }" @submit="onSubmit" class="form">
      <div class="gap16">
        <p class="form__title">Make a new password</p>
      </div>
      <div class="gap16">
        <label class="form__item">
          <span
            class="passwordChange"
            @click="typePassword === 'text' ? (typePassword = 'password') : (typePassword = 'text')"
            :class="{ op50: typePassword === 'text' }"
          ></span>
          <input
            :class="{ inputError: errors.password }"
            maxlength="127"
            v-model="password"
            v-bind="passwordAttrs"
            :type="typePassword"
            class="form__input"
          />
          <p :class="{ activeLabel: password }" class="label">Password</p>
          <p v-if="!password" class="placeholder">********</p>
          <p v-if="errors.password" class="error"><span></span>{{ errors.password }}</p>
        </label>
        <label class="form__item">
          <span
            class="passwordChange"
            @click="
              typeRepeatPassword === 'text'
                ? (typeRepeatPassword = 'password')
                : (typeRepeatPassword = 'text')
            "
            :class="{ op50: typeRepeatPassword === 'text' }"
          ></span>
          <input
            maxlength="127"
            :class="{ inputError: errors.repeatPassword }"
            v-model="repeatPassword"
            v-bind="repeatPasswordAttrs"
            :type="typeRepeatPassword"
            class="form__input"
          />
          <p :class="{ activeLabel: repeatPassword }" class="label">Repeat Password</p>
          <p v-if="!repeatPassword" class="placeholder">********</p>
          <p v-if="errors.repeatPassword" class="error"><span></span>{{ errors.repeatPassword }}</p>
        </label>
      </div>
      <div class="goAndError">
        <button :disabled="!meta.valid" :class="{ blockBtn: !meta.valid }" class="formGreen">
          Change
        </button>
        <p v-if="error" class="error"><span></span>{{ error }}</p>
      </div>
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
.passwordChange {
  cursor: pointer;
  position: absolute;
  top: 18px;
  right: 12px;
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url('/login/eye.svg');
  &.op50 {
    opacity: 0.5;
  }
  @media (max-width: 600px) {
    top: 9px;
    width: 19px;
  }
}
.form__item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  .placeholder {
    position: absolute;
    top: 13px;
    left: 16px;
    font-size: 20px;
    font-family: Segoe UI;
    pointer-events: none;
    color: #4e4e4e;
    font-weight: 600;
    opacity: 0;
    transition: 0.2s;
    &.activePlaceholder {
      opacity: 1;
    }
    @media (max-width: 600px) {
      top: 10px;
      font-size: 14px;
    }
  }
  .label {
    pointer-events: none;
    position: absolute;
    top: 15px;
    left: 10px;
    font-size: 20px;
    font-family: Segoe UI;
    font-weight: 600;
    line-height: 120%;
    padding: 0px 4px;
    background: white;
    color: #4e4e4e;
    transition: 0.2s;
    @media (max-width: 600px) {
      font-size: 14px;
      top: 12px;
    }
  }
  .form__input {
    width: 350px;
    font-size: 20px;
    font-family: Segoe UI;
    border-radius: 8px;
    color: #4e4e4e;
    font-weight: 600;
    border: 2px solid #4e4e4e;
    outline: none;
    padding: 12px;
    &.inputError {
      border: 2px solid #ff6464;
    }
    &::placeholder {
      color: #4e4e4e;
    }
    @media (max-width: 600px) {
      width: 260px;
      font-size: 14px;
      padding: 8px 12px;
      border: 1px solid #4e4e4e;
      &.inputError {
        border: 1px solid #ff6464;
      }
    }
    &:focus,
    &:active {
      ~ .label {
        position: absolute;
        top: -8px;
        left: 14px;
        font-size: 12px;
        font-family: Segoe UI;
        font-weight: 600;
        line-height: 120%;
        padding: 0px 4px;
        background: white;
        color: #4e4e4e;
      }
      ~ .placeholder {
        opacity: 1;
      }
    }
  }
  .activeLabel {
    position: absolute;
    top: -8px;
    left: 14px;
    font-size: 12px;
    font-family: Segoe UI;
    font-weight: 600;
    line-height: 120%;
    padding: 0px 4px;
    background: white;
    color: #4e4e4e;
  }
}
.block {
  background: white;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 48px;
  padding: 32px 72px 52px 72px;
  @media (max-width: 600px) {
    padding: 24px 32px 24px 32px;
    width: 324px;
  }
  &.displayNone {
    display: none;
  }
}
.form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  &.loading {
    opacity: 0.7;
  }
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

.gap8 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}
.googleBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  cursor: pointer;
  gap: 8px;
  padding: 9px;
  width: 100%;
  font-size: 20px;
  font-family: Segoe UI;
  border-radius: 8px;
  color: #4e4e4e;
  font-weight: 600;
  border: 2px solid #4e4e4e;
  span {
    width: 32px;
    height: 32px;
    background-size: contain;
    background-image: url('/login/google.svg');
    background-repeat: no-repeat;
    @media (max-width: 600px) {
      width: 24px;
      height: 24px;
    }
  }
  @media (max-width: 600px) {
    font-size: 16px;
    padding: 6px;
    border: 1px solid #4e4e4e;
  }
}
.iagree {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px auto 20px 20px;
  @media (max-width: 600px) {
    margin: 16px auto 16px auto;
    width: 250px;
  }
  input {
    display: none;
  }
  .fake {
    cursor: pointer;
    width: 24px;
    height: 24px;
    background: white;
    border: 3px solid #4e4e4e;
    border-radius: 8px;
    transition: 0.2s;
    position: relative;
    @media (max-width: 600px) {
      min-width: 20px;
      height: 20px;
      border: 2px solid #4e4e4e;
    }
    &::after {
      content: '';
      display: block;
      width: 16px;
      height: 17px;
      background-image: url('/login/checked.svg');
      opacity: 0;
      background-size: contain;
      background-repeat: no-repeat;
      position: absolute;
      left: 0px;
      top: 1px;
      @media (max-width: 600px) {
        width: 14px;
        height: 16px;
        border: 2px solid #4e4e4e;
      }
    }
  }
  input:checked + .fake {
    background: #5fa55c;
  }
  input:checked + .fake::after {
    opacity: 1;
  }
  .form__text {
    font-size: 14px;
    font-weight: 400;
  }
}

.goAndError {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.formGreen {
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
  &.blockBtn {
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
.gap16 {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 13px;
  margin-bottom: 22px;
  @media (max-width: 600px) {
    gap: 14px;
    margin-bottom: 20px;
  }
}
.form__text {
  font-size: 20px;
  font-family: Segoe UI;
  font-weight: 600;
  color: #4e4e4e;
  &.or {
    margin-top: -5px;
    margin-bottom: -5px;
  }
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

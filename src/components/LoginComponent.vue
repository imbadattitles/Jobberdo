<script setup>
import login from '@/API/login'
import googleAuth from '@/API/googleAuth'
import { useFetch } from '@/API/useFetch.vue'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import * as yup from 'yup'
import GoogleBtn from './GoogleBtn.vue'
import { useRouter } from 'vue-router'
defineProps(['changeModal'])
const typePassword = ref('password')
const [logCLick, isLoading, error] = useFetch(async () => {
  try {
    await login('web', email.value, password.value)
    alert('готово к редиректу')
  } catch (error) {
    throw new Error(error.message)
  }
})
const [googleFetch, isLoadingGoogle, errorGoogle] = useFetch(async () => {
  try {
    await googleAuth(router.currentRoute.value.query.code, router.currentRoute.value.query.error)
    alert('готово к редиректу')
  } catch (error) {
    throw new Error(error.message)
  }
})

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(127).required()
  })
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(() => {
  logCLick()
})
const router = useRouter()
const googleQuery = () => {
  if (router.currentRoute.value.path === '/googleAuth') {
    googleFetch()
  }
}
onMounted(() => {
  googleQuery()
})
</script>
<template>
  <div class="block">
    <form :class="{ loading: isLoading | isLoadingGoogle }" @submit="onSubmit" class="form">
      <p class="form__title">Log in</p>
      <label class="form__item">
        <p class="label">Email Address</p>
        <input
          v-model="email"
          v-bind="emailAttrs"
          placeholder="Email Address"
          class="form__input"
        />
        <p v-if="errors.email" class="error"><span></span>{{ errors.email }}</p>
      </label>

      <div class="gap8">
        <label class="form__item">
          <span
            class="passwordChange"
            @click="typePassword === 'text' ? (typePassword = 'password') : (typePassword = 'text')"
            :class="{ op50: typePassword === 'text' }"
          ></span>
          <p class="label">Password</p>
          <input
            v-model="password"
            v-bind="passwordAttrs"
            placeholder="Password"
            class="form__input"
          />
          <p v-if="errors.password" class="error"><span></span>{{ errors.password }}</p>
        </label>

        <p class="form__text">or</p>
        <GoogleBtn />
      </div>
      <div class="goAndError">
        <button
          :disabled="isLoading"
          @click="
            (e) => {
              e.preventDefault()
              logCLick()
            }
          "
          class="formGreen"
        >
          Log in
        </button>
        <p v-if="error" class="error"><span></span>{{ error }}</p>
        <p v-if="errorGoogle" class="error"><span></span>{{ errorGoogle }}</p>
      </div>

      <div class="gap16">
        <p class="form__text"><span class="form__link">Forgot your password?</span></p>
        <p class="form__text">
          No account? <span @click="changeModal('reg')" class="form__link">Create account</span>
        </p>
      </div>
    </form>
  </div>
</template>
<style scoped>
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
.form__item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  .label {
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
    padding: 16px 32px 20px 32px;
  }
}
.form {
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
  margin-bottom: 20px;
  color: #4e4e4e;
  @media (max-width: 600px) {
    font-size: 24px;
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
  padding: 12px;
  &::placeholder {
    color: #4e4e4e;
  }
  @media (max-width: 600px) {
    width: 260px;
    font-size: 14px;
    padding: 8px 12px;
    border: 1px solid #4e4e4e;
  }
}
.gap8 {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.goAndError {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
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
  &.block {
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
  gap: 16px;
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

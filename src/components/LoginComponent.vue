<script setup>
import login from '@/API/login'
import { useFetch } from '@/API/useFetch.vue'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const typePassword = ref('password')
const [logCLick, isLoading, error] = useFetch(async () => {
  try {
    await login('web', email.value, password.value)
  } catch (error) {
    throw new Error('error')
  } finally {
    email.value = ''
    password.value = ''
  }
})
</script>
<template>
  <div class="block">
    <form :class="{ loading: isLoading }" class="form">
      <p class="form__title">Log in</p>
      <label class="form__item">
        <p class="label">Email Address</p>
        <input placeholder="Email Address" v-model="email" class="form__input" />
      </label>

      <div class="gap8">
        <label class="form__item">
          <span
            class="passwordChange"
            @click="typePassword === 'text' ? (typePassword = 'password') : (typePassword = 'text')"
            :class="{ op50: typePassword === 'text' }"
          ></span>
          <p class="label">Password</p>
          <input placeholder="Password" v-model="password" class="form__input" />
        </label>

        <p class="form__text">or</p>
        <button class="googleBtn"><span />Continue with Google</button>
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
      </div>

      <div class="gap16">
        <p class="form__text"><span class="form__link">Forgot your password?</span></p>
        <p class="form__text">No account? <span class="form__link">Create account</span></p>
      </div>
    </form>
  </div>
</template>
<style scoped>
.passwordChange {
  cursor: pointer;
  position: absolute;
  bottom: 16px;
  right: 12px;
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url('/login/eye.svg');
  &.op50 {
    opacity: 0.5;
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
}
.gap8 {
  margin-top: 16px;
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
  }
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

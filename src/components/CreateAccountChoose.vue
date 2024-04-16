<script setup>
import { defineProps } from 'vue'
defineProps(['activeType'])
const emit = defineEmits(['stepAction', 'setType'])
const clickItem = (type) => {
  emit('setType', type)
}
</script>
<template>
  <div class="block">
    <form class="form">
      <div class="gap12">
        <p class="form__title">Create account</p>
        <p class="form__text">Firstly tell us what are you looking for</p>
      </div>
      <div class="whoYou">
        <div
          @click="clickItem('customer')"
          :class="{ active: activeType === 'customer' }"
          class="whoYou__item"
        >
          <img src="/login/customer.svg" alt="customer" class="whoYou__img customer" />
          <p class="whoYou__title">I am a customer</p>
          <p class="whoYou__text">I want to hire workers</p>
        </div>
        <div
          @click="clickItem('freelancer')"
          :class="{ active: activeType === 'freelancer' }"
          class="whoYou__item"
        >
          <img src="/login/freelancer.svg" alt="freelancer" class="whoYou__img freelancer" />
          <p class="whoYou__title">I am a freelancer</p>
          <p class="whoYou__text">I want to find a job</p>
        </div>
      </div>
      <button
        :disabled="!activeType"
        @click.prevent="$emit('stepAction', 2)"
        :class="{ block: !activeType }"
        class="formGreen"
      >
        Next
      </button>
      <p class="form__text">Already have an account? <span class="form__link">Log in</span></p>
    </form>
  </div>
</template>
<style scoped>
.block {
  background: white;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 48px;
  padding: 32px 72px 32px 72px;
}
.form {
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
.gap12 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
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
  margin-bottom: 22px;
  line-height: 120%;
  &.block {
    opacity: 0.5;
  }
  &:hover {
    box-shadow: 0px 4px 13.7px 0px rgba(0, 0, 0, 0.25) inset;
  }
}
.whoYou {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 22px;
}
.whoYou__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 22px 18px;
  gap: 8px;
  border: 1px solid #4e4e4e;
  border-radius: 8px;
  background: white;
  width: 241px;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    opacity: 0.7;
  }
  &.active {
    background: #aadd91;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.25) inset;
  }
}
.whoYou__title {
  font-size: 24px;
  font-weight: 600;
  font-family: Segoe UI;
}
.whoYou__text {
  font-size: 20px;
  font-weight: 400;
  font-family: Segoe UI;
}
.whoYou__img {
  background-size: contain;
  background-repeat: no-repeat;
  &.customer {
    width: 100px;
    height: 115px;
  }
  &.freelancer {
    width: 100px;
    height: 123px;
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

<script setup>
import { RouterLink } from 'vue-router'
import HeaderNavItem from './HeaderNavItem.vue'
import { ref } from 'vue'
const auth = ref(false)
const menu = [
  {
    name: 'Freelancers',
    link: '/'
  },
  {
    name: 'Work',
    link: '/'
  },
  {
    name: 'More',
    link: '/'
  }
]
</script>
<template>
  <header class="header">
    <!-- <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav> -->
    <div class="row">
      <div class="left">
        <RouterLink to="/"><img src="/logo.svg" alt="Jobberdo" /></RouterLink>
        <nav class="nav">
          <HeaderNavItem :title="menu[0]" />
          <HeaderNavItem :title="menu[1]" />
          <HeaderNavItem :title="menu[2]" />
        </nav>
      </div>
      <div class="right">
        <div v-if="!auth" class="logBtns">
          <button class="logBtns__login" @click="auth = !auth">Login</button>
          <button class="logBtns__signUp" @click="auth = !auth">Sign Up</button>
        </div>
        <div v-if="auth" class="accauntIcons">
          <div class="accauntIcons__notification"></div>
          <div class="accauntIcons__projects"></div>
          <div class="accauntIcons__profile">
            <img src="/header/profileDefault.svg" alt="profile" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped>
.header {
  background: white;
  padding: 12px;
  position: fixed;
  width: 100%;
}
.row {
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: space-between;
  width: 1280px;
}
.left {
  display: flex;
  align-items: center;
  gap: 64px;
  .nav {
    display: flex;
    align-items: center;
    gap: 32px;
    max-height: 100px;
  }
}
.logBtns {
  display: flex;
  gap: 12px;
  button {
    font-size: 20px;
    font-family: 'Segoe UI';
    font-weight: 600;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s;
    &.logBtns__login {
      color: #4e4e4e;
      border: 1px solid #e5efff;
      background: white;
      &:hover {
        background: #e5efff;
      }
    }
    &.logBtns__signUp {
      color: white;
      border: 1px solid #dbdbdb;
      background: #b9d967;
      &:hover {
        background: #5c6c30;
      }
    }
  }
}
.accauntIcons {
  display: flex;
  align-items: center;
  gap: 48px;
  div {
    cursor: pointer;
  }
  .accauntIcons__notification {
    width: 24px;
    height: 24px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('/header/notification.svg');
  }
  .accauntIcons__projects {
    width: 24px;
    height: 24px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('/header/projects.svg');
  }
  .accauntIcons__profile {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid rgb(176, 208, 230);
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import HeaderNavItem from './HeaderNavItem.vue'
import PopUpRegLogin from './PopUpRegLogin.vue'
import { onMounted, ref, watchEffect } from 'vue'
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
const openBurger = ref(false)
const router = useRouter()
const logOrRegModal = ref(false)
const setModal = (modal) => {
  logOrRegModal.value = modal
}
const googleQuery = () => {
  if (router.currentRoute.value.path === '/googleAuth') {
    logOrRegModal.value = 'log'
  }
}
onMounted(() => {
  watchEffect(() => {
    googleQuery()
  })
})
</script>
<template>
  <header class="header">
    <div class="row">
      <div class="left">
        <RouterLink to="/">
          <div class="logoContain">
            <img src="/logo.png" class="logo" alt="Jobberdo" />
            <p>Jobberdo</p>
          </div>
        </RouterLink>
        <div class="rightMob">
          <div v-if="auth" class="rightMob__icons">
            <div class="accauntIcons__notification"></div>
            <div class="accauntIcons__projects"></div>
          </div>
          <div v-if="!openBurger" @click="openBurger = true" class="burger"></div>
          <div v-else @click="openBurger = false" class="closeBurger"></div>
        </div>

        <nav class="nav">
          <HeaderNavItem :title="menu[0]" />
          <HeaderNavItem :title="menu[1]" />
          <HeaderNavItem :title="menu[2]" />
        </nav>
      </div>
      <div class="right">
        <div v-if="!auth" class="logBtns">
          <button @click="logOrRegModal = 'log'" class="logBtns__login">Log in</button>
          <button @click="logOrRegModal = 'reg'" class="logBtns__signUp">Sign up</button>
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
    <div v-if="openBurger" class="menuMobile">
      <nav class="navMobile">
        <RouterLink class="none600" v-if="auth" to="/">
          <div class="menuMobile__profile">
            <img src="/header/profileDefault.svg" class="accauntIcons__profile" alt="profile" />
            <p>My profile</p>
          </div></RouterLink
        >
        <RouterLink to="/"><p>Freelancers</p></RouterLink>
        <RouterLink to="/"><p>Work</p></RouterLink>
        <RouterLink to="/"><p>About Us</p></RouterLink>
        <RouterLink to="/"><p>News</p></RouterLink>
        <RouterLink to="/"><p>Contact</p></RouterLink>
      </nav>
      <div v-if="!auth" class="logBtns">
        <button class="logBtns__login" @click="logOrRegModal = 'log'">Log in</button>
        <button class="logBtns__signUp" @click="logOrRegModal = 'reg'">Sign up</button>
      </div>
    </div>
  </header>
  <PopUpRegLogin v-if="logOrRegModal" :openModal="logOrRegModal" @modalChange="setModal" />
</template>
<style scoped>
.menuMobile {
  display: none;
  .logBtns {
    display: none;
  }
  @media (max-width: 1280px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 74px;
    left: 0;
    background: white;
    padding: 8px 20px 12px 8px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    border-top: 2px solid #e0e0e0;
    @media (max-width: 600px) {
      gap: 24px;
      top: 70px;
      .logBtns {
        display: flex;
      }
    }
  }
}
.rightMob {
  display: flex;
  gap: 16px;
  align-items: center;
  .rightMob__icons {
    display: none;
    @media (max-width: 600px) {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }
}
.navMobile {
  display: flex;
  flex-direction: column;
  gap: 12px;
  p,
  a {
    font-size: 16px;
    font-family: 'Segoe UI';
    font-weight: 600;
    color: #4e4e4e;
  }
  a {
    padding: 8px 10px;
    border-bottom: 1px solid #e0e0e0;
  }
  .menuMobile__profile {
    display: flex;
    align-items: center;
    gap: 8px;
    img {
      width: 38px;
      height: 38px;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}
.none600 {
  display: none;
  @media (max-width: 600px) {
    display: block;
  }
}
.header {
  background: white;
  padding: 12px;
  position: fixed;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
}
.row {
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: space-between;
  width: 1280px;
  @media (max-width: 1280px) {
    width: 100%;
  }
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
    @media (max-width: 1280px) {
      display: none;
    }
  }
  @media (max-width: 1280px) {
    gap: 48px;
    @media (max-width: 600px) {
      width: 100%;
      justify-content: space-between;
    }
  }
}
.burger {
  display: none;
  @media (max-width: 1280px) {
    display: block;
    width: 24px;
    height: 24px;
    cursor: pointer;
    background: url('/header/burger.svg');
  }
}
.closeBurger {
  display: none;
  @media (max-width: 1280px) {
    display: block;
    width: 24px;
    height: 24px;
    cursor: pointer;
    background: url('/header/closeBurger.svg');
  }
}
.logoContain {
  display: flex;
  gap: 8px;
  align-items: center;
  .logo {
    width: 45px;
    max-height: 53px;
    background-size: contain;
    background-repeat: no-repeat;
  }
  p {
    font-size: 36px;
    font-family: 'Alata';
    color: #4e4e4e;
    @media (max-width: 1280px) {
      font-size: 24px;
    }
  }
}

.logoMob {
  display: none;
  @media (max-width: 1280px) {
    display: block;
    width: 154px;
    height: 44px;
  }
}
.right {
  @media (max-width: 600px) {
    display: none;
  }
}
.logBtns {
  display: flex;
  gap: 12px;
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }
  button {
    font-size: 20px;
    font-family: 'Segoe UI';
    font-weight: 600;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s;
    @media (max-width: 600px) {
      font-size: 16px;
      width: 100%;
    }
    &.logBtns__login {
      color: #4e4e4e;
      border: 1px solid #aadd91;
      background: white;
      &:hover {
        background: #aadd91;
        color: white;
      }
    }
    &.logBtns__signUp {
      color: white;
      border: 1px solid #e0e0e0;
      background: #5fa55c;
      &:hover {
        background: #528849;
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
  border: 2px solid #e0e0e0;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>

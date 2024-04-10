<script setup>
import { ref } from 'vue'
const onHover = ref(false)
defineProps(['title', 'list'])
</script>
<template>
  <div :class="{ hover: onHover }" class="navItem">
    <RouterLink :to="title.link"
      ><p class="title">{{ title.name }} <span @click="onHover = !onHover"></span></p
    ></RouterLink>
    <ul @mouseleave="onHover = false" v-if="onHover" class="navItem__list">
      <li>
        <RouterLink to="/"><p>WebSites</p></RouterLink>
      </li>
      <li>
        <RouterLink to="/"><p>Something long for example</p></RouterLink>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.navItem {
  position: relative;
  .title {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 8px;
    color: #4e4e4e;
    font-size: 20px;
    font-family: 'Segoe UI';
    font-weight: 600;
    transition: 0.2s;
    line-height: 130%;
    span {
      width: 20px;
      height: 20px;
      transition: 0.2s;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url('/header/arrow.svg');
    }
    &:hover {
      background: #aadd91;
    }
  }
  &.hover {
    .title {
      background: #aadd91;
      span {
        transform: rotate(180deg);
      }
    }
  }
}
.navItem__list {
  position: absolute;
  width: 300px;
  top: 60px;
  left: -17px;
  padding: 0px 4px 8px 4px;
  list-style: none;
  background: white;
  border-radius: 8px;
  li {
    color: #4e4e4e;
    font-size: 20px;
    font-family: 'Segoe UI';
    font-weight: 400;
    border-bottom: 1px solid #dbdbdb;
    transition: 0.2s;
    background: white;
    padding: 8px 16px;

    &:hover {
      background: #aadd91;
    }
  }
}
</style>

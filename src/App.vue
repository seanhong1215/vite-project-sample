<template>
  <router-view />
</template>

<script>
import MessageState from '@/methods/pushMessageState.js';
import {date, currency} from '@/methods/filters.js';

export default {
  provide(){
    return {
      MessageState,
      date,
      currency
    }
  }
};
</script>

<style lang="scss">
@import "bootstrap/scss/bootstrap";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

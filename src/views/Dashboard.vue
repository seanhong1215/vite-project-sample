<template>
  <navbar />
  <div class="container-fluid mt-3 position-relative">
    <toast-messages></toast-messages>
    <router-view v-if="status" />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import ToastMessages from "@/components/ToastMessages.vue";
export default {
  name: "Dashboard",
  components: { Navbar, ToastMessages },
  inject: ['MessageState'],
  data() {
    return {
      status: false,
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexschool\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      this.$http.defaults.headers.common["Authorization"] = token;
      this.$http
        .post(`${import.meta.env.VITE_API}api/user/check`)
        .then(() => {
          this.status = true;
        })
        .catch((error) => {
          this.MessageState(error.response, '錯誤訊息');
          this.$router.push("/");
        });
    },
  },
};
</script>

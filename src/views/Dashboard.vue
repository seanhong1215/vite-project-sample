<template>
  <Navbar/>
  <div class="container-fluid mt-3 position-relative">
    <!-- <ToastMessages></ToastMessages> -->
    <router-view v-if="status"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
  name: "Dashboard",
  components: { Navbar },
  data() {
    return {
      status: false,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexschool\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`;
        this.$http
          .post(`${import.meta.env.VITE_API}api/user/check`)
            .then(() => {
              this.status = true;
            })
            .catch((err) => {
              alert(err.response.data.message);
              this.$router.push('/');
            });
      }
    },

  },
};
</script>

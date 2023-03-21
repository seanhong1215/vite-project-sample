<template>
  <div class="container mt-5">
    <Loading :active="isLoading" :z-index="1000"></Loading>
    <ToastMessages></ToastMessages>
    <div class="container">
        <div class="row justify-content-center">
          <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
          <div class="col-12">
            <form id="form" class="form-signin" @submit.prevent="signIn">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  v-model="user.username"
                  id="username"
                  placeholder="name@example.com"
                  required
                  autofocus
                />
                <label for="username">Email address</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  v-model="user.password"
                  id="password"
                  placeholder="Password"
                  required
                />
                <label for="password">Password</label>
              </div>
              <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
                登入
              </button>
            </form>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import ToastMessages from '@/components/ToastMessages.vue';
export default {
  components: {
    ToastMessages,
  },
  inject: ['MessageState'],
  data() {
    return {
      isLoading: false,
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      this.isLoading = true;
      axios
        .post(`${import.meta.env.VITE_API}admin/signin`, this.user)
        .then((response) => {
          console.log(response)
          if (response.data.success === true) {
            const { token, expired } = response.data;
            document.cookie = `hexschool=${token}; expires=${new Date(expired)};`;
            this.isLoading = false;
            this.$router.push("/admin/products");
            }
        })
        .catch((error) => {
          this.isLoading = false;
          this.MessageState(error.response, '登入失敗');
        });
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
  text-align: center;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-signin {
  width: 100%;
  padding: 15px;
  margin: auto;
}
</style>

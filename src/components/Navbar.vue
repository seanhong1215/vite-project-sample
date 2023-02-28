<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/admin/products" class="navbar-brand">時尚小冰服飾專賣店</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">
          <router-link to="/admin/products" class="nav-link">產品</router-link>
          <router-link to="/admin/orders" class="nav-link">訂單</router-link>
          <router-link to="/admin/coupons" class="nav-link">優惠券</router-link>
          <router-link to="/admin/article" class="nav-link">貼文</router-link>
          <a href="#" @click.prevent="signout" class="nav-link">登出</a>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    signout() {
      const api = `${import.meta.env.VITE_API}/logout`;
      this.$http.post(api)
        .then((res) => {
          if (res.data.success) {
              this.$router.push('/');
            }
        })
        .catch((err) => {
          this.$swal.fire(
                `${err.response.data.message}!!!`,
                '錯誤訊息',
                'error'
            )
        });
    },
  },
};
</script>
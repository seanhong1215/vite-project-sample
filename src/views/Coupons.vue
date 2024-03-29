<template>
  <div>
    <Loading :active="isLoading" :z-index="1000"></Loading>
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
        type="button"
        @click="openCouponModal(true)"
      >
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openDelCouponModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CouponModal
      :coupon="tempCoupon"
      :is-new="isNew"
      ref="couponModal"
      @update-coupon="updateCoupon"
    />
    <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon" />
  </div>
</template>
<script>
import CouponModal from "@/components/CouponModal.vue";
import DelModal from "@/components/DelModal.vue";
export default {
  components: { CouponModal, DelModal },
  props: {
    config: Object,
  },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: "",
        is_enabled: 0,
        percent: 100,
        code: "",
      },
      isLoading: false,
      isNew: false,
    };
  },
  inject: ['MessageState', 'date'],
  methods: {
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.$refs.couponModal.openModal();
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
    getCoupons() {
      this.isLoading = true;
      const url = `${import.meta.env.VITE_API}/api/${
        import.meta.env.VITE_PATH
      }/admin/coupons`;
      this.$http
        .get(url, this.tempProduct)
        .then((response) => {
          this.coupons = response.data.coupons;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.MessageState(err.response, '取得優惠券 API 資料');
        });
    },
    updateCoupon(tempCoupon) {
      this.isLoading = true;
      let url = `${import.meta.env.VITE_API}/api/${
        import.meta.env.VITE_PATH
      }/admin/coupon`;
      let httpMethos = "post";
      let status = "新增";
      let data = tempCoupon;
      if (!this.isNew) {
        url = `${import.meta.env.VITE_API}/api/${
          import.meta.env.VITE_PATH
        }/admin/coupon/${this.tempCoupon.id}`;
        httpMethos = "put";
        status = "更新";
        data = this.tempCoupon;
      }
      this.$http[httpMethos](url, { data })
        .then((res) => {
          this.isLoading = false;
          this.MessageState(res, `${status}優惠券`);
          this.getCoupons();
          this.$refs.couponModal.hideModal();
        })
        .catch((err) => {
          this.isLoading = false;
          this.MessageState(err.response, `${status}優惠券`);
      })
    },
    delCoupon() {
      const url = `${import.meta.env.VITE_API}/api/${
        import.meta.env.VITE_PATH
      }/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoading = false;
          this.MessageState(res, '優惠券刪除');
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
          this.getCoupons();
        })
        .catch((err) => {
          this.isLoading = false;
          this.MessageState(err.response, '優惠券刪除');
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>

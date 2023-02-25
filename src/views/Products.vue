<template>
  <div>
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td width="120">{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td width="120" class="text-end">
            {{ product.origin_price }}
          </td>
          <td width="120" class="text-end">
            {{ product.price }}
          </td>
          <td>
            <span v-if="product.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelProductModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @emit-pages="getProducts"></pagination>
     <!-- ProductModal -->
     <ProductModal
      @update-product="updateProduct"
      :product="tempProduct"
      :isNew="isNew"
      ref="productModal"
    />
    <!-- DelModal -->
    <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct"></DelModal>
  </div>
</template>

<script>
import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/Pagination.vue';
import ProductModal from '@/components/ProductModal.vue';
import { apiAddProduct, apiUpdateProduct, apiDelProduct } from '@/utils/api.js';

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
      modal: {
        editModal: '',
        delModal: '',
      },
      currentPage: 1,
    };
  },
  components: {
    Pagination, DelModal, ProductModal
  },
  methods: {
    getProducts(page = 1) {
      this.currentPage = page;
      this.isLoading = true;
      // API
      const api = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/products?page=${page}`;
      this.$http.get(api)
        .then((response) => {
          this.products = response.data.products;
          this.pagination = response.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.response.data.message);
        });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = { ...item };
        this.isNew = false;
      }
      const productComponent = this.$refs.productModal;
      productComponent.openModal();
    },
    updateProduct(item) {
      this.tempProduct = item;
      this.isLoading = true;
      const productComponent = this.$refs.productModal;
      let status = '新增產品';
      apiAddProduct({ data: this.tempProduct }).then((response) => {
        this.isLoading = false;
        console.log(response, status)
        productComponent.hideModal();
        this.getProducts(this.currentPage);
      }).catch((error) => {
        this.isLoading = false;
        console.log(error.response, status)
      });
      if (!this.isNew) {
        apiUpdateProduct(this.tempProduct.id, { data: this.tempProduct }).then((response) => {
        this.isLoading = false;
        console.log(response, status)
        productComponent.hideModal();
        this.getProducts(this.currentPage);
      }).catch((error) => {
        this.isLoading = false;
        console.log(error.response, status)
      });
        status = '更新產品';
      }
    },
    openDelProductModal(item) {
      this.tempProduct = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
    delProduct() {
      
      this.isLoading = true;
      apiDelProduct(this.tempProduct.id).then((response) => {
        this.isLoading = false;
        console.log(response, '刪除產品')
        // this.$httpMessageState(response, '刪除產品');
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getProducts(this.currentPage);
      }).catch((error) => {
        this.isLoading = false;
        console.log(error.response, '刪除產品')
        // this.$httpMessageState(error.response, '刪除產品');
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

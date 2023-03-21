<template>
  <div>
    <Loading :active="isLoading" :z-index="1000"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        建立新的頁面
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th style="width: 200px">標題</th>
          <th style="width: 200px">作者</th>
          <th>描述</th>
          <th style="width: 100px">建立時間</th>
          <th style="width: 100px">是否公開</th>
          <th style="width: 120px">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>{{ article.description }}</td>
          <td>{{ date(article.create_at) }}</td>
          <td>
            <span v-if="article.isPublic">已上架</span>
            <span v-else>未上架</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="getArticle(article.id)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelArticleModal(article)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ArticleModal
      ref="articleModal"
      :article="tempArticle"
      :is-new="isNew"
      @update-article="updateArticle"
    ></ArticleModal>
    <DelModal :item="tempArticle" ref="delModal" @del-item="delArticle" />
  </div>
</template>

<script>
import ArticleModal from "@/components/ArticleModal.vue";
import DelModal from "@/components/DelModal.vue";
export default {
  data() {
    return {
      articles: [],
      isLoading: false,
      isNew: false,
      tempArticle: {},
      currentPage: 1,
    };
  },
  inject: ['MessageState', 'date'],
  components: {
    ArticleModal,
    DelModal,
  },
  methods: {
    getArticles(page = 1) {
      this.currentPage = page;
      const api = `${import.meta.env.VITE_API}/api/${
        import.meta.env.VITE_PATH
      }/admin/articles?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.articles = res.data.articles;
            this.pagination = res.data.pagination;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.MessageState(err.response, '取得文章 API 資料');
        });
    },
    getArticle(id) {
      const api = `${import.meta.env.VITE_API}/api/${
        import.meta.env.VITE_PATH
      }/admin/article/${id}`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.openModal(false, res.data.article);
            this.isNew = false;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.MessageState(err.response, '編輯文章 API 資料');
        });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: [],
        };
        this.isNew = true;
      } else {
        this.tempArticle = { ...item };
        this.isNew = false;
      }
      this.$refs.articleModal.openModal();
    },
    updateArticle(item) {
      this.tempArticle = item;
      let api = `${import.meta.env.VITE_API}/api/${
        import.meta.env.VITE_PATH
      }/admin/article`;
      let httpMethod = "post";
      let status = "新增";
      this.isLoading = true;
      if (!this.isNew) {
        api = `${import.meta.env.VITE_API}/api/${
          import.meta.env.VITE_PATH
        }/admin/article/${this.tempArticle.id}`;
        httpMethod = "put";
        status = "更新";
      }
      const articleComponent = this.$refs.articleModal;
      this.$http[httpMethod](api, { data: this.tempArticle })
        .then((res) => {
          this.isLoading = false;
          this.MessageState(res, `${status}文章`);
          articleComponent.hideModal();
          this.getArticles(this.currentPage);
        })
        .catch((err) => {
          this.isLoading = false;
          this.MessageState(err.response, `${status}文章`);
        });
    },
    openDelArticleModal(item) {
      this.tempArticle = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
    delArticle() {
      const url = `${import.meta.env.VITE_API}/api/${
        import.meta.env.VITE_PATH
      }/admin/article/${this.tempArticle.id}`;
      this.isLoading = true;
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoading = false;
          this.MessageState(res, '刪除文章');
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
          this.getArticles(this.currentPage);
        })
        .catch((err) => {
          this.isLoading = false;
          this.MessageState(err.response, '刪除文章');
        });
    },
  },
  created() {
    this.getArticles();
  },
};
</script>

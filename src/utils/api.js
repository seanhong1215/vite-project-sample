import axios from 'axios';

const baseRequest = axios.create({
  baseURL: `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}`,
});

// 全部產品列表
export const apiGetAllProducts = () => baseRequest.get('/products/all');
export const apiGetProducts = (page) => baseRequest.get(`/products?page=${page}`);
// 單一產品內容
export const apiGetProduct = (id) => baseRequest.get(`/product/${id}`);

// 加入購物車
export const apiAddToCart = (data) => baseRequest.post('/cart', data);
// 購物車清單
export const apiGetCart = () => baseRequest.get('/cart');
// 更新購物車
export const apiUpdateCart = (id, data) => baseRequest.put(`/cart/${id}`, data);
// 清空購物車
export const apiDeleteAllCarts = () => baseRequest.delete('/carts');
// 刪除單一產品
export const apiRemoveCartItem = (id) => baseRequest.delete(`/cart/${id}`);

// 建立訂單
export const apiGetUserOrders = (page) => baseRequest.get(`/orders?page=${page}`);
export const apiGetUserOrder = (id) => baseRequest.get(`/order/${id}`);
export const apiCreateOrder = (data) => baseRequest.post('/order', data);

// 優惠券
export const apiUserCoupon = (data) => baseRequest.post('/coupon', data);

// 付款
export const apiUserAddPay = (id) => baseRequest.post(`/pay/${id}`);

// 文章
export const apiGetUserArticles = (page) => baseRequest.get(`/articles?page=${page}`);
export const apiGetUserArticle = (id) => baseRequest.get(`/article/${id}`);

//Dashboard

// 產品列表
export const apiAdminGetProducts= (page) => baseRequest.get(`/admin/products?page=${page}`);
export const apiAdminGetProduct= () => baseRequest.get('/admin/products/all');
export const apiAddProduct= (data) => baseRequest.post('/admin/product', data);
export const apiUpdateProduct= (id, data) => baseRequest.put(`/admin/product/${id}`, data);
export const apiDelProduct= (id) => baseRequest.delete(`/admin/product${id}`);

// 訂單列表
export const apiGetOrders= (page) => baseRequest.get(`/admin/orders?page=${page}`);
export const apiUpdateOrder= (id, data) => baseRequest.put(`/admin/order/${id}`, data);
export const apiDelOrder= (id) => baseRequest.delete(`/admin/order/${id}`);
export const apiDelOrders= () => baseRequest.delete('/admin/orders/all');

// 優惠券
export const apiGetCoupons= (page) => baseRequest.get(`/admin/coupons?page=${page}`);
export const apiAddCoupon= (data) => baseRequest.post('/admin/coupon', data);
export const apiUpdateCoupon= (id, data) => baseRequest.put(`/admin/coupon/${id}`, data);
export const apiDelCoupon= (id) => baseRequest.delete(`/admin/coupon/${id}`);

//文章
export const apiGetArticles= (page) => baseRequest.get(`/admin/articles?page=${page}`);
export const apiGetArticle= (id) => baseRequest.put(`/admin/article/${id}`);
export const apiUpdateArticle= (id, data) => baseRequest.put(`/admin/article/${id}`, data);
export const apiDelArticle= (id) => baseRequest.delete(`/admin/article/${id}`);
export const apiAddArticle= (data) => baseRequest.post('/admin/article', data);

//圖片
export const apiUpload= () => baseRequest.post('/admin/upload');



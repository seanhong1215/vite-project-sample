import{_ as p,o as s,c as n,a as e,i as _,j as g,F as h,g as u,t as r,d as k,b as P,r as f}from"./index-b1306a14.js";import{g as v}from"./api-ca49048a.js";const x={props:["pages"],methods:{updatePage(d){this.$emit("emitPages",d)}}},b={"aria-label":"Page navigation example"},y={class:"pagination justify-content-center"},w=e("span",{"aria-hidden":"true"},"«",-1),$=[w],C={key:0,class:"page-link"},N=["onClick"],B=e("span",{"aria-hidden":"true"},"»",-1),E=[B];function V(d,t,i,m,l,c){return s(),n("nav",b,[e("ul",y,[e("li",{class:_([{disabled:!i.pages.has_pre},"page-item"])},[e("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:t[0]||(t[0]=g(a=>c.updatePage(i.pages.current_page-1),["prevent"]))},$)],2),(s(!0),n(h,null,u(i.pages.total_pages,a=>(s(),n("li",{class:_(["page-item",{active:i.pages.current_page===a}]),key:a},[a===i.pages.current_page?(s(),n("span",C,r(a),1)):(s(),n("a",{key:1,class:"page-link",href:"#",onClick:g(o=>c.updatePage(a),["prevent"])},r(a),9,N))],2))),128)),e("li",{class:_(["page-item",{disabled:!i.pages.has_next}])},[e("a",{class:"page-link",href:"#","aria-label":"Next",onClick:t[1]||(t[1]=g(a=>c.updatePage(i.pages.current_page+1),["prevent"]))},E)],2)])])}const j=p(x,[["render",V]]),F={name:"Products",props:["token"],data(){return{products:[],pagination:{}}},components:{Pagination:j},methods:{getProducts(d=1){v(d).then(t=>{this.products=t.data.products,this.pagination=t.data.pagination}).catch(t=>{alert(t.response.data.message)})}},mounted(){this.getProducts()}},z={class:"table mt-4"},A=e("thead",null,[e("tr",null,[e("th",{width:"120"},"分類"),e("th",null,"產品名稱"),e("th",{width:"120"},"原價"),e("th",{width:"120"},"售價"),e("th",{width:"100"},"是否啟用")])],-1),D={width:"120"},L={width:"120",class:"text-end"},M={width:"120",class:"text-end"},S={key:0,class:"text-success"},T={key:1};function q(d,t,i,m,l,c){const a=f("pagination");return s(),n("div",null,[k(" 後台 產品列表 "),e("table",z,[A,e("tbody",null,[(s(!0),n(h,null,u(l.products,o=>(s(),n("tr",{key:o.id},[e("td",D,r(o.category),1),e("td",null,r(o.title),1),e("td",L,r(o.origin_price),1),e("td",M,r(o.price),1),e("td",null,[o.is_enabled?(s(),n("span",S,"啟用")):(s(),n("span",T,"未啟用"))])]))),128))])]),P(a,{pages:l.pagination,onEmitPages:c.getProducts},null,8,["pages","onEmitPages"])])}const I=p(F,[["render",q]]);export{I as default};
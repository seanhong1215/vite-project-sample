import{_ as u,a as m,c as _,b as f,d as s,w as h,e as c,v as l,r as g,o as v,p as w,f as b}from"./index-dcf0a1b7.js";const x={data(){return{isLoading:!1,user:{username:"",password:""}}},methods:{signIn(){this.isLoading=!0,m.post("https://vue3-course-api.hexschool.io/v2/admin/signin",this.user).then(e=>{if(e.data.success===!0){const{token:o,expired:a}=e.data;document.cookie=`hexschool=${o}; expires=${new Date(a)};`,this.isLoading=!1,o&&this.$swal.fire("登入成功!","即將進入產品頁面","success").then(r=>{r.isConfirmed&&this.$router.push("/admin/products")})}}).catch(e=>{this.isLoading=!1,this.$swal.fire(`${e.response.data.message}!!!`,"請確認您的Email..","error")})}}},n=e=>(w("data-v-8c26b0ec"),e=e(),b(),e),L={class:"container mt-5"},y={class:"container"},I={class:"row justify-content-center"},k=n(()=>s("h1",{class:"h3 mb-3 font-weight-normal"},"請先登入",-1)),S={class:"col-8"},V={class:"form-floating mb-3"},$=n(()=>s("label",{for:"username"},"Email address",-1)),B={class:"form-floating"},E=n(()=>s("label",{for:"password"},"Password",-1)),q=n(()=>s("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"}," 登入 ",-1));function C(e,o,a,r,t,d){const p=g("Loading");return v(),_("div",L,[f(p,{active:t.isLoading,"z-index":1060},null,8,["active"]),s("div",y,[s("div",I,[k,s("div",S,[s("form",{id:"form",class:"form-signin",onSubmit:o[2]||(o[2]=h((...i)=>d.signIn&&d.signIn(...i),["prevent"]))},[s("div",V,[c(s("input",{type:"email",class:"form-control","onUpdate:modelValue":o[0]||(o[0]=i=>t.user.username=i),id:"username",placeholder:"name@example.com",required:"",autofocus:""},null,512),[[l,t.user.username]]),$]),s("div",B,[c(s("input",{type:"password",class:"form-control","onUpdate:modelValue":o[1]||(o[1]=i=>t.user.password=i),id:"password",placeholder:"Password",required:""},null,512),[[l,t.user.password]]),E]),q],32)])])])])}const M=u(x,[["render",C],["__scopeId","data-v-8c26b0ec"]]);export{M as default};
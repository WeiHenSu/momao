"use strict";(self["webpackChunkfinal_project"]=self["webpackChunkfinal_project"]||[]).push([[593],{4593:function(s,e,t){t.r(e),t.d(e,{default:function(){return y}});var o=t(3396),r=t(9242),a=t(6665);const n={class:"container mt-5"},l={class:"loginBox col-md-6 p-4"},i={class:"logo mx-auto pb-4"},c=(0,o._)("img",{src:a,class:"w-100 h-auto"},null,-1),u={class:"mb-3"},d=(0,o._)("label",{for:"inputEmail",class:"sr-only mb-2"},"帳號 （電子郵件）",-1),p={key:0,class:"text-danger ms-1"},m=(0,o._)("small",null,"帳號或密碼錯誤",-1),h=[m],w={class:"mb-2"},f=(0,o._)("label",{for:"inputPassword",class:"sr-only mb-2"},"密碼",-1),_=(0,o._)("div",{class:"mt-4"},[(0,o._)("button",{class:"btn sty2",type:"submit"},"登入")],-1);function k(s,e,t,a,m,k){const b=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",n,[(0,o._)("form",{class:"row justify-content-center",onSubmit:e[2]||(e[2]=(0,r.iM)(((...s)=>k.signIn&&k.signIn(...s)),["prevent"]))},[(0,o._)("div",l,[(0,o._)("div",i,[(0,o.Wm)(b,{to:"/"},{default:(0,o.w5)((()=>[c])),_:1})]),(0,o._)("div",u,[d,(0,o.wy)((0,o._)("input",{type:"email",id:"inputEmail",class:"form-control",placeholder:"請輸入電子信箱",required:"",autofocus:"","onUpdate:modelValue":e[0]||(e[0]=s=>m.user.username=s)},null,512),[[r.nr,m.user.username]]),m.checkPassword>=1?((0,o.wg)(),(0,o.iD)("span",p,h)):(0,o.kq)("",!0)]),(0,o._)("div",w,[f,(0,o.wy)((0,o._)("input",{type:"password",id:"inputPassword",class:"form-control",placeholder:"請輸入密碼",required:"","onUpdate:modelValue":e[1]||(e[1]=s=>m.user.password=s)},null,512),[[r.nr,m.user.password]])]),_])],32)])}t(7658);var b={data(){return{user:{username:"",password:""},checkPassword:0}},methods:{signIn(){const s="https://vue3-course-api.hexschool.io/admin/signin";this.$http.post(s,this.user).then((s=>{if(console.log("login回應：",s.data),s.data.success){const e=s.data.token,t=s.data.expired;document.cookie=`loginToken=${e}; expires=${new Date(t)}; SameSite=None; Secure`,this.$router.push("/rootboard/rootproductlist")}else this.checkPassword<3?(alert("帳號密碼錯誤"),this.checkPassword+=1):(alert("錯誤次數過多，跳轉回首頁"),this.checkPassword=0,this.$router.push("/"))}))}}},g=t(89);const v=(0,g.Z)(b,[["render",k]]);var y=v}}]);
//# sourceMappingURL=593.5de45b42.js.map
"use strict";(self["webpackChunkfinal_project"]=self["webpackChunkfinal_project"]||[]).push([[264],{7264:function(e,s,l){l.r(s),l.d(s,{default:function(){return P}});var a=l(3396),t=l(7139),i=l(9242);const o=(0,a._)("div",{class:"noteList row py-4"},[(0,a._)("div",{class:"progress px-0"},[(0,a._)("div",{class:"progress-bar barBackground progress-bar-striped",role:"progressbar",style:{width:"50%"},"aria-valuenow":"50","aria-valuemin":"0","aria-valuemax":"100"})]),(0,a._)("div",{class:"col-4"},[(0,a._)("div",{class:"notes d-flex flex-column align-items-center"},[(0,a._)("div",{class:"notesItem active mb-2"},[(0,a._)("span",null,"1")]),(0,a._)("p",{class:"notesTitle"}," 確認商品 ")])]),(0,a._)("div",{class:"col-4"},[(0,a._)("div",{class:"notes d-flex flex-column align-items-center"},[(0,a._)("div",{class:"notesItem active mb-2"},[(0,a._)("span",null,"2")]),(0,a._)("p",{class:"notesTitle"}," 填寫資料 ")])]),(0,a._)("div",{class:"col-4"},[(0,a._)("div",{class:"notes d-flex flex-column align-items-center"},[(0,a._)("div",{class:"notesItem mb-2"},[(0,a._)("span",null,"3")]),(0,a._)("p",{class:"notesTitle"}," 完成訂單 ")])])],-1),c={class:"row flex-lg-row flex-column-reverse"},r={class:"col-lg-8 col-md-12"},d=(0,a._)("div",{class:"checkTitle mb-4"},[(0,a._)("h3",{class:"fw-bold"},"填寫資料")],-1),n={class:"checkTitle mb-3"},m=(0,a._)("label",{for:"email",class:"form-label"},"Email",-1),u={class:"checkTitle mb-3"},f=(0,a._)("label",{for:"name",class:"form-label"},"收件人姓名",-1),p={class:"checkTitle mb-3"},_=(0,a._)("label",{for:"tel",class:"form-label"},"收件人電話",-1),v={class:"checkTitle mb-3"},h=(0,a._)("label",{for:"address",class:"form-label"},"收件人地址",-1),b={class:"checkTitle mb-3"},g=(0,a._)("label",{for:"message",class:"form-label"},"留言",-1),w={class:"buttonArea d-flex justify-content-end"},k=(0,a._)("div",{class:"ms-3"},[(0,a._)("button",{class:"btn sty7"},"送出訂單")],-1),x={class:"col-lg-4 col-md-12"},T={class:"checkOrder mt-4 p-4"},y=(0,a._)("p",{class:"fw-bold fs-4"},"我的訂單",-1),V={class:"itemImg"},C=["src"],W={class:"d-flex w-100 ps-3 justify-content-between align-items-center"},U={class:"itemGroup mb-1 d-flex flex-column"},$={class:"itemTitle"},j={class:"fw-bold"},L={class:"itemUnit"},q={class:"fw-bold"},z={class:"itemPrice"},I={class:""},B={class:"totalPrice pt-3 mt-3"},D={class:"text-success pw-bold fs-4 d-flex justify-content-between"},O=(0,a._)("span",null,"總結： ",-1);function E(e,s,l,E,F,H){const M=(0,a.up)("LoadingComponent"),P=(0,a.up)("VField"),S=(0,a.up)("ErrorMessage"),Y=(0,a.up)("VForm");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(M,{active:F.isLoading},null,8,["active"]),o,(0,a._)("div",c,[(0,a._)("div",r,[(0,a.Wm)(Y,{class:"p-4",onSubmit:H.createOrder},{default:(0,a.w5)((({errors:e})=>[d,(0,a._)("div",n,[m,(0,a.Wm)(P,{id:"email",name:"email",type:"email",class:(0,t.C_)(["form-control",{"is-invalid":e["email"]}]),placeholder:"請輸入電子郵件",rules:"email|required",modelValue:F.form.user.email,"onUpdate:modelValue":s[0]||(s[0]=e=>F.form.user.email=e)},null,8,["class","modelValue"]),(0,a.Wm)(S,{name:"email",class:"invalid-feedback"})]),(0,a._)("div",u,[f,(0,a.Wm)(P,{id:"name",name:"姓名",type:"text",class:(0,t.C_)(["form-control",{"is-invalid":e["姓名"]}]),placeholder:"請輸入姓名",rules:"required",modelValue:F.form.user.name,"onUpdate:modelValue":s[1]||(s[1]=e=>F.form.user.name=e)},null,8,["class","modelValue"]),(0,a.Wm)(S,{name:"姓名",class:"invalid-feedback"})]),(0,a._)("div",p,[_,(0,a.Wm)(P,{id:"tel",name:"電話",type:"tel",class:(0,t.C_)(["form-control",{"is-invalid":e["電話"]}]),placeholder:"請輸入電話",rules:"required",modelValue:F.form.user.tel,"onUpdate:modelValue":s[2]||(s[2]=e=>F.form.user.tel=e)},null,8,["class","modelValue"]),(0,a.Wm)(S,{name:"電話",class:"invalid-feedback"})]),(0,a._)("div",v,[h,(0,a.Wm)(P,{id:"address",name:"地址",type:"text",class:(0,t.C_)(["form-control",{"is-invalid":e["地址"]}]),placeholder:"請輸入地址",rules:"required",modelValue:F.form.user.address,"onUpdate:modelValue":s[3]||(s[3]=e=>F.form.user.address=e)},null,8,["class","modelValue"]),(0,a.Wm)(S,{name:"地址",class:"invalid-feedback"})]),(0,a._)("div",b,[g,(0,a.wy)((0,a._)("textarea",{name:"",id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":s[4]||(s[4]=e=>F.form.message=e)},null,512),[[i.nr,F.form.message]])]),(0,a._)("div",w,[(0,a._)("div",null,[(0,a._)("button",{class:"btn sty7",onClick:s[5]||(s[5]=(0,i.iM)(((...e)=>H.goBack&&H.goBack(...e)),["prevent"]))},"上一步")]),k])])),_:1},8,["onSubmit"])]),(0,a._)("div",x,[(0,a._)("div",T,[y,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(F.cart,(e=>((0,a.wg)(),(0,a.iD)("div",{class:"item d-flex mb-1",key:e.id},[(0,a._)("div",V,[(0,a._)("img",{src:e.product.imageUrl,style:{width:"50px",height:"50px","object-fit":"cover"}},null,8,C)]),(0,a._)("div",W,[(0,a._)("div",U,[(0,a._)("div",$,[(0,a._)("span",j,(0,t.zw)(e.product.title),1)]),(0,a._)("div",L,[(0,a._)("span",q,(0,t.zw)(e.qty)+" "+(0,t.zw)(e.product.unit),1)])]),(0,a._)("div",z,[(0,a._)("span",I,"$ "+(0,t.zw)(e.total),1)])])])))),128)),(0,a._)("div",B,[(0,a._)("p",D,[O,(0,a._)("span",null,"NT$ "+(0,t.zw)(F.fTotal),1)])])])])])],64)}l(7658);var F={data(){return{form:{user:{name:"",email:"",tel:"",address:""},message:""},cart:{},fTotal:0,oTotal:0,isLoading:!1}},methods:{getCart(){this.isLoading=!0;const e="https://vue3-course-api.hexschool.io/api/david-api/cart";this.$http.get(e).then((e=>{e.data.success&&(this.isLoading=!1,this.cart=e.data.data.carts,this.fTotal=e.data.data.final_total,this.oTotal=e.data.data.total,console.log("check2",this.cart))}))},createOrder(){const e="https://vue3-course-api.hexschool.io/api/david-api/order",s={user:{name:this.form.user.name,email:this.form.user.email,tel:this.form.user.tel,address:this.form.user.address},message:this.form.message};this.$http.post(e,{data:s}).then((e=>{if(e.data.success){const s=e.data.orderId;this.$router.push(`/userboard/checkout3/${s}`)}}))},goBack(){this.$router.back()}},created(){this.getCart()}},H=l(89);const M=(0,H.Z)(F,[["render",E]]);var P=M}}]);
//# sourceMappingURL=264.9010318d.js.map
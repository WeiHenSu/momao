"use strict";(self["webpackChunkfinal_project"]=self["webpackChunkfinal_project"]||[]).push([[753],{9753:function(t,s,e){e.r(s),e.d(s,{default:function(){return G}});var a=e(3396),i=e(7139),l=e(9242);const o=(0,a._)("div",{class:"noteList row py-4"},[(0,a._)("div",{class:"progress px-0"},[(0,a._)("div",{class:"progress-bar barBackground progress-bar-striped",role:"progressbar",style:{width:"50%"},"aria-valuenow":"50","aria-valuemin":"0","aria-valuemax":"100"})]),(0,a._)("div",{class:"col-4"},[(0,a._)("div",{class:"notes d-flex flex-column align-items-center"},[(0,a._)("div",{class:"notesItem active mb-2"},[(0,a._)("span",null,"1")]),(0,a._)("p",{class:"notesTitle"}," 確認商品 ")])]),(0,a._)("div",{class:"col-4"},[(0,a._)("div",{class:"notes d-flex flex-column align-items-center"},[(0,a._)("div",{class:"notesItem mb-2"},[(0,a._)("span",null,"2")]),(0,a._)("p",{class:"notesTitle"}," 填寫資料 ")])]),(0,a._)("div",{class:"col-4"},[(0,a._)("div",{class:"notes d-flex flex-column align-items-center"},[(0,a._)("div",{class:"notesItem mb-2"},[(0,a._)("span",null,"3")]),(0,a._)("p",{class:"notesTitle"}," 完成訂單 ")])])],-1),n=(0,a._)("div",{class:"checkTitle mb-4"},[(0,a._)("h2",null,"確認商品")],-1),c={class:"row py-4"},d={class:"table tableBox"},u=(0,a._)("thead",null,[(0,a._)("tr",{class:"text-light tableBackground text-center"},[(0,a._)("th",{width:"61%"}," 品項 "),(0,a._)("th",{width:"13%"}," 數量 "),(0,a._)("th",{width:"13%"}," 價格 "),(0,a._)("th",{width:"13%"}," 編輯 ")])],-1),r={"data-title":"品項："},p=["src"],h={class:"mb-0 fw-bold ps-3"},m={"data-title":"數量："},_={class:"inputRWD"},g={class:"input-group align-items-center"},b={class:"input-group-prepend"},f=["onClick"],v=(0,a._)("i",{class:"bi bi-dash"},null,-1),C=[v],y=["onUpdate:modelValue","onChange"],w={class:"input-group-prepend"},k=["onClick"],x=(0,a._)("i",{class:"bi bi-plus"},null,-1),T=[x],$={"data-title":"價格："},I={key:0,class:"fw-bold"},L={key:1,class:"fw-bold"},D={class:"d-block"},z={class:"text-success"},N={"data-title":"編輯："},Q=["onClick"],V=(0,a._)("i",{class:"bi bi-trash"},null,-1),q=[V],B={class:"couponInput py-3 text-end"},j=(0,a._)("span",{class:"fw-bold"},"折扣碼輸入：",-1),U={type:"text",ref:"couponCode"},H={class:"finalPrice text-end mb-5"},W={key:0,class:"fw-bold fs-5"},Y={key:1,class:"fw-bold fs-5"},K={class:"d-block"},M={class:"text-success"},P={class:"text-end"},R={class:"btnBox"};function Z(t,s,e,v,x,V){const Z=(0,a.up)("LoadingComponent");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(Z,{active:x.isLoading},null,8,["active"]),o,n,(0,a._)("div",c,[(0,a._)("table",d,[u,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(x.cartInfo,((t,s)=>((0,a.wg)(),(0,a.iD)("tr",{class:"text-center",key:t.id},[(0,a._)("td",r,[(0,a._)("img",{src:t.product.imageUrl,style:{width:"72px",height:"72px","object-fit":"cover"}},null,8,p),(0,a._)("p",h,(0,i.zw)(t.product.title),1)]),(0,a._)("td",m,[(0,a._)("div",_,[(0,a._)("div",g,[(0,a._)("div",b,[(0,a._)("button",{class:"countBtn btn btn-muted btn-sm",id:"minus-btn",onClick:e=>V.minusQty(t,s)},C,8,f)]),(0,a.wy)((0,a._)("input",{type:"number",class:"form-control form-control-sm text-center",min:"1","onUpdate:modelValue":s=>t.qty=s,ref_for:!0,ref:"inputQty",onChange:s=>V.updateCart(t)},null,40,y),[[l.nr,t.qty]]),(0,a._)("div",w,[(0,a._)("button",{class:"countBtn btn btn-muted btn-sm",id:"plus-btn",onClick:e=>V.addQty(t,s)},T,8,k)])])])]),(0,a._)("td",$,[x.couponValid?((0,a.wg)(),(0,a.iD)("span",L,[(0,a._)("span",D,[(0,a._)("del",null,[(0,a._)("small",null,"NT $ "+(0,i.zw)(t.total),1)])]),(0,a._)("span",z,"NT $ "+(0,i.zw)(t.final_total),1)])):((0,a.wg)(),(0,a.iD)("span",I,"$ "+(0,i.zw)(t.total),1))]),(0,a._)("td",N,[(0,a._)("a",{href:"#",onClick:(0,l.iM)((s=>V.delCartItem(t)),["prevent"])},q,8,Q)])])))),128))])]),(0,a._)("div",B,[j,(0,a._)("input",U,null,512),(0,a._)("button",{type:"button",class:"btn small btn-sm",onClick:s[0]||(s[0]=(...t)=>V.checkCoupon&&V.checkCoupon(...t))}," 檢查 ")]),(0,a._)("div",H,[x.couponValid?((0,a.wg)(),(0,a.iD)("p",Y,[(0,a._)("span",K,[(0,a._)("del",null,[(0,a._)("small",null,"原價：NT $ "+(0,i.zw)(x.oTotal),1)])]),(0,a._)("span",M,"折扣後：NT $ "+(0,i.zw)(x.fTotal),1)])):((0,a.wg)(),(0,a.iD)("p",W,"總金額：NT $ "+(0,i.zw)(x.oTotal),1))]),(0,a._)("div",P,[(0,a._)("div",R,[(0,a._)("button",{type:"button",class:"btn sty5",onClick:s[1]||(s[1]=(...t)=>V.toCheck2&&V.toCheck2(...t))}," 下一步 ")])])])],64)}e(7658);var A={data(){return{cartInfo:{},fTotal:0,oTotal:0,couponValid:!1,isLoading:!1}},inject:["emitter"],methods:{getCarts(){this.isLoading=!0;const t="https://vue3-course-api.hexschool.io/api/david-api/cart";this.$http.get(t).then((t=>{t.data.success&&(this.isLoading=!1,this.cartInfo=t.data.data.carts,this.fTotal=t.data.data.final_total,this.oTotal=t.data.data.total,console.log("cartInfo",this.cartInfo))}))},delCartItem(t){this.isLoading=!0;const s=`https://vue3-course-api.hexschool.io/api/david-api/cart/${t.id}`;this.$http.delete(s).then((t=>{t.data.success?(this.isLoading=!1,console.log("delCartItem",t.data),this.emitter.emit("connectCart"),this.getCarts(),this.emitter.emit("push-message",{style:"success",title:"刪除商品成功"})):this.emitter.emit("push-message",{style:"danger",title:"新增商品失敗"})}))},updateCart(t){const s=`https://vue3-course-api.hexschool.io/api/david-api/cart/${t.id}`,e={product_id:t.product.id,qty:t.qty};this.$http.put(s,{data:e}).then((t=>{t.data.success?(console.log("updateItem",t.data),this.emitter.emit("connectCart"),this.getCarts(),this.emitter.emit("push-message",{style:"success",title:"更新商品成功"})):this.emitter.emit("push-message",{style:"danger",title:"更新商品失敗"})}))},addQty(t,s){t.qty=Number(this.$refs.inputQty[s].value)+1,this.updateCart(t)},minusQty(t,s){t.qty=Number(this.$refs.inputQty[s].value)-1,this.updateCart(t)},toCheck2(){this.$router.push("/userboard/checkout2")},checkCoupon(){this.isLoading=!0;const t="https://vue3-course-api.hexschool.io/api/david-api/coupon",s=this.$refs.couponCode.value;console.log(s);const e={code:s};this.$http.post(t,{data:e}).then((t=>{t.data.success?(this.isLoading=!1,this.getCarts(),this.couponValid=!0,this.emitter.emit("connectCoupon",{couponValid:!0}),this.emitter.emit("push-message",{style:"success",title:"套用優惠券成功"})):this.emitter.emit("push-message",{style:"success",title:"套用優惠券失敗"}),console.log("checkcoupon",t.data)}))}},created(){this.getCarts(),this.emitter.on("connectCheckout",(()=>{this.getCarts()}))}},E=e(89);const F=(0,E.Z)(A,[["render",Z]]);var G=F}}]);
//# sourceMappingURL=753.5eebd5e9.js.map
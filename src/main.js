import { createApp } from 'vue'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// 讀取效果
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
// VeeValidate
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
// bs
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
// Marquee
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
// 原
import App from './App.vue'
import router from './router'

defineRule('email', email)
defineRule('required', required)
defineRule('min', min)
// Activate the locale
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
})
setLocale('zh_TW')

const app = createApp(App)
app.component('LoadingComponent', Loading)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('Vue3Marquee', Vue3Marquee)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')

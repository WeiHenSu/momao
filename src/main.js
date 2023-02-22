import { createApp } from 'vue'
import axios from 'axios'
import 'bootstrap'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
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
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')

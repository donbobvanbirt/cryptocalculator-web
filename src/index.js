import Vue from 'vue'
import SuiVue from 'semantic-ui-vue'

import App from './components/App.vue'

Vue.use(SuiVue)

new Vue({
  render: h => h(App)
}).$mount('#app')

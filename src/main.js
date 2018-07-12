import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '../node_modules/ag-grid/dist/styles/ag-grid.css'
import '../node_modules/ag-grid/dist/styles/ag-theme-balham.css'
import firebase from 'firebase'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false


var config = {
  apiKey: "AIzaSyCQAcLtlRBunK9f11hWGLV8A_VZjIsHhMo",
  authDomain: "guru2018-7f13e.firebaseapp.com",
  databaseURL: "https://guru2018-7f13e.firebaseio.com",
  projectId: "guru2018-7f13e",
  storageBucket: "guru2018-7f13e.appspot.com",
  messagingSenderId: "630580682023"
};

firebase.initializeApp(config);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

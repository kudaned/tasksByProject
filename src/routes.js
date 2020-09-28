import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "./views/Home"
import Dashboard from "./views/Dashboard"
import About from "./views/About"
import Login from "./views/Auth/login"
import Main from "./views/Main_OLD"

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Dashboard },
    { path: '/original', component: Home },
    { path: '/login', component: Login },
    { path: '/about', component: About },
    { path: '/layout', component: Main }
  ]
})

import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HospitalRegisterView from "@/views/HospitalRegisterView.vue";
import LoginView from "@/views/LoginView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/hospital/register",
    name: 'hospitalRegister',
    component: HospitalRegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin/dashboard',
    name: 'adminDashboard',

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

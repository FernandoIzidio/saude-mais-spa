import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalized } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: { bodyClass: 'home-page' },
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: "/hospital/register",
    name: 'hospitalRegister',
    meta: { bodyClass: 'hospital-register-page' },
    component: () => import("@/views/HospitalRegisterView.vue")
  },
  {
    path: '/login',
    name: 'login',
    meta: { bodyClass: 'login-page' },
    component: () => import("@/views/LoginView.vue")
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import("@/views/LogoutView.vue")
  },
  {
    path: '/hospital/dashboard',
    name: 'hospitalDashboard',
    meta: { bodyClass: 'hospital-dashboard-page' },
    component: () => import("@/views/HospitalView.vue")
  },
  {
    path: '/hospital/dashboard/profile',
    name: 'hospitalProfile',
    meta: { bodyClass: 'hospital-profile-page' },
    component: () => import("@/views/ProfileView.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
  const nearestWithMeta = to.matched.slice().reverse().find((r: any) => r.meta && r.meta.bodyClass) as { meta: { bodyClass: string } } | undefined;
  if (nearestWithMeta && nearestWithMeta.meta.bodyClass) {
    document.body.className = nearestWithMeta.meta.bodyClass;
  } else {
    document.body.className = '';
  }
  next();
});

export default router

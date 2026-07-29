const routes = [
  {
    path: '/',
    component: () => import('../layouts/LandingLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../pages/User/LandingPage.vue'),
      },
      {
        path: 'second',
        component: () => import('../pages/User/SecondPage.vue'),
      },
      {
        path: 'destinasi-detail',
        component: () => import('../pages/User/DestinasiDetailPage.vue'),
      },
      {
        path: 'peta',
        component: () => import('../pages/User/PetaWisataPage.vue'),
      },
      {
        path: 'laporkan',
        component: () => import('../pages/User/LaporkanKondisiPage.vue'),
      },
      {
        path: 'tentang',
        component: () => import('../pages/User/TentangSistemPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../pages/User/LoginPage.vue'),
  },
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/admin/dashboard',
      },
      {
        path: 'dashboard',
        component: () => import('../pages/Admin/AdminDashboardPage.vue'),
      },
      {
        path: 'monitoring',
        component: () => import('../pages/Admin/AdminMonitoringPage.vue'),
      },
      {
        path: 'input-area',
        component: () => import('../pages/Admin/AdminInputAreaPage.vue'),
      },
    ],
  },
  // Always leave this as last one
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue'),
  },
]

export default routes

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/support'
  },
  {
    path: '/support',
    name: 'helpCenter',
    component: () => import('../modules/helpCenter/views/helpCenter')
  },
  {
    path: '/support/:categoryId',
    name: 'helpCenterCategoryList',
    component: () => import('../modules/helpCenter/views/helpCenter/category')
  },
  {
    path: '/support/:categoryId/:articleId',
    name: 'helpCenterArticle',
    component: () => import('../modules/helpCenter/views/helpCenter/article')
  },
  {
    path: '/admin/support',
    redirect: '/admin/support/categories'
  },
  {
    path: '/admin/support/articles',
    name: 'helpCenterAdminArticles',
    component: () => import('../modules/helpCenter/views/helpCenter/admin/articles')
  },
  {
    path: '/admin/support/categories',
    name: 'helpCenterAdminCategories',
    component: () => import('../modules/helpCenter/views/helpCenter/admin/category')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

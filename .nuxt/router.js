import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7855cef2 = () => interopDefault(import('..\\pages\\cart\\index.vue' /* webpackChunkName: "pages/cart/index" */))
const _7b008aae = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _4adc0013 = () => interopDefault(import('..\\pages\\posts\\create\\index.vue' /* webpackChunkName: "pages/posts/create/index" */))
const _045e08d9 = () => interopDefault(import('..\\pages\\shop\\register\\index.vue' /* webpackChunkName: "pages/shop/register/index" */))
const _07eb3f24 = () => interopDefault(import('..\\pages\\user\\register\\index.vue' /* webpackChunkName: "pages/user/register/index" */))
const _512fd0f0 = () => interopDefault(import('..\\pages\\user\\shops\\index.vue' /* webpackChunkName: "pages/user/shops/index" */))
const _20162dfa = () => interopDefault(import('..\\pages\\posts\\create\\product\\_id.vue' /* webpackChunkName: "pages/posts/create/product/_id" */))
const _1a545a18 = () => interopDefault(import('..\\pages\\posts\\create\\service\\_id.vue' /* webpackChunkName: "pages/posts/create/service/_id" */))
const _3c10dafa = () => interopDefault(import('..\\pages\\shop\\edit\\_id.vue' /* webpackChunkName: "pages/shop/edit/_id" */))
const _117d3ce4 = () => interopDefault(import('..\\pages\\shop\\gallery\\_id.vue' /* webpackChunkName: "pages/shop/gallery/_id" */))
const _3c7bb9ad = () => interopDefault(import('..\\pages\\shop\\posts\\_id.vue' /* webpackChunkName: "pages/shop/posts/_id" */))
const _77290117 = () => interopDefault(import('..\\pages\\shop\\profile\\_id.vue' /* webpackChunkName: "pages/shop/profile/_id" */))
const _75fa8ab0 = () => interopDefault(import('..\\pages\\user\\account\\_id.vue' /* webpackChunkName: "pages/user/account/_id" */))
const _21c4e137 = () => interopDefault(import('..\\pages\\posts\\_id.vue' /* webpackChunkName: "pages/posts/_id" */))
const _0e4fd0dc = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/cart",
    component: _7855cef2,
    name: "cart"
  }, {
    path: "/login",
    component: _7b008aae,
    name: "login"
  }, {
    path: "/posts/create",
    component: _4adc0013,
    name: "posts-create"
  }, {
    path: "/shop/register",
    component: _045e08d9,
    name: "shop-register"
  }, {
    path: "/user/register",
    component: _07eb3f24,
    name: "user-register"
  }, {
    path: "/user/shops",
    component: _512fd0f0,
    name: "user-shops"
  }, {
    path: "/posts/create/product/:id?",
    component: _20162dfa,
    name: "posts-create-product-id"
  }, {
    path: "/posts/create/service/:id?",
    component: _1a545a18,
    name: "posts-create-service-id"
  }, {
    path: "/shop/edit/:id?",
    component: _3c10dafa,
    name: "shop-edit-id"
  }, {
    path: "/shop/gallery/:id?",
    component: _117d3ce4,
    name: "shop-gallery-id"
  }, {
    path: "/shop/posts/:id?",
    component: _3c7bb9ad,
    name: "shop-posts-id"
  }, {
    path: "/shop/profile/:id?",
    component: _77290117,
    name: "shop-profile-id"
  }, {
    path: "/user/account/:id?",
    component: _75fa8ab0,
    name: "user-account-id"
  }, {
    path: "/posts/:id?",
    component: _21c4e137,
    name: "posts-id"
  }, {
    path: "/",
    component: _0e4fd0dc,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}

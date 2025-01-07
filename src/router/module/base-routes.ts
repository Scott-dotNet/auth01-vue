import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Panel from '../../views/panel/panel-index.vue';
import Login from '../../views/login/login-index.vue';
import Framework from '../../views/framework/framework-index.vue';

export const routes: RouteRecordRaw[] = [];

routes.push(
  {
    path: '/framework',
    component: Framework,
    name: "架构",

  },
  {
    path: '/login',
    component: Login,
    name: "登录页面",
  },
  {
    path: '/panel',
    component: Panel,
    name: "面板",
  },
  {
    path: '/menu',
    redirect: '/menu/menu-index',
    meta: { title: '菜单管理' },
    name: "菜单管理",
    children: [
      {
        path: '/menu',
        name: '菜单',
        component: () => import('../../views/menu/menu-index.vue'),
        meta: { title: '菜单', requireAuth: true, affix: true, closable: false },
      }
    ]
  },
  {
    path: '/user',
    meta: { title: '用户管理' },
    name: "用户管理",
    children: [
      {
        path: '/user',
        name: '用户',
        component: () => import('../../views/user/user-index.vue'),
        meta: { title: '用户' },
      }]
  },
)

/** 
//创建路由，并且暴露出去
const router = createRouter({
  history: createWebHashHistory(), //开发环境
  //history:createWebHistory(), //正式环境
  routes
})
export default router
*/
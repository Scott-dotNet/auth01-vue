import { createRouter, createWebHashHistory, NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import { routes } from "./module/base-routes";
import  NProgress  from "nprogress";
import "nprogress/nprogress.css";
import { useUserStore } from "@/store/user";

NProgress.configure({ showSpinner: false });

const router = createRouter({
    history: createWebHashHistory(), // 开发环境
    routes
});

/**
 * 路由守卫，访问路由菜单前拦截
 * @param to 目标
 * @param from 来源
 */
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    NProgress.start();
    const userStore = useUserStore();
    const endTime = new Date(userStore.expiresDate);
    const nowTime = new Date();
    to.path = from.path;
    if (to.meta.requiresAuth && nowTime > endTime) {
        router.push('/login');
    } 

    if (to.meta.requiresAuth) {
        next();
    } else if (to.matched.length == 0) {
        next({ path: "/login" });
    } else {
        next();
    }
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
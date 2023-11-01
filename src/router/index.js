import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Plan from "@/views/Plan.vue";

let routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "工作台",
    },
  },
  {
    path: "/plan",
    name: "Plan",
    component: Plan,
    meta: {
      title: "计划管理",
    },
  },
];
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

router.beforeEach((to, from, next) => {
  // 获取目标路由的标题
  const title = to.meta.title || "计划管理";

  // 设置页面标题
  document.title = title;

  next();
});

export default router;

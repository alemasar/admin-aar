import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/private",
    name: "private",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "private" */ "../views/Private.vue"),
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "/register",
        name: "register",
        component: () =>
          import(
            /* webpackChunkName: "register" */ "../views/private/Register.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;

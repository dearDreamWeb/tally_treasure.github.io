import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("@/views/Home.vue");
const NotFound = () => import("@/views/NotFound.vue");
const HomeContent = () => import("@/components/HomeContent.vue");
const Tally = () => import("@/components/Tally.vue");
const Detail = () => import("@/components/Detail.vue");
const Tags = () => import("@/components/Tags.vue");
const Statistics = () => import("@/components/Statistics.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "home",
        component: HomeContent,
      },
      {
        path: "tally",
        component: Tally
      },
      {
        path: "detail",
        component: Detail
      },
      {
        path: "tags",
        component: Tags
      },
      {
        path: "statistics",
        component: Statistics
      }
    ]
  },
  {
    path: "*",
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;

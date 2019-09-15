import VueRouter, {RouteConfig} from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import TyrMap from "../components/map/TyrMap.vue";

const routes: RouteConfig[] = [
  {
    path: '/search',
    component: HelloWorld
  },
  {
    path: '/map',
    component: TyrMap
  }
];

export default new VueRouter({routes, base: '/map'})

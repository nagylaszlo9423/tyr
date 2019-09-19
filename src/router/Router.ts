import VueRouter, {RouteConfig} from "vue-router";
import Pages from "../components/Pages.vue";
import HelloWorld from "../components/HelloWorld.vue";
import TyrMap from "../components/map/TyrMap.vue";

const routes: RouteConfig[] = [
  {
    path: '**',
    component: Pages,
    children: [
      {
        path: 'search',
        component: HelloWorld
      },
      {
        path: 'map',
        component: TyrMap
      }
    ]
  }
];

export default new VueRouter({routes, base: '/map'})

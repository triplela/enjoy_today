import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Options from '../pages/Options.vue';
import Preview from '../pages/Preview.vue';
import Rolling from '../pages/Rolling.vue';
import Result from '../pages/Result.vue';
import NotFound from '../pages/NotFound.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/options', name: 'Options', component: Options },
  { path: '/preview', name: 'Preview', component: Preview },
  { path: '/rolling', name: 'Rolling', component: Rolling },
  { path: '/result', name: 'Result', component: Result },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

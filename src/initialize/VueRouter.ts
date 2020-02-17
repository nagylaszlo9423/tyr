import Vue from 'vue';
import VueRouter from 'vue-router';
import {router} from '@/Router';
import {authGuard} from '@/guards/AuthGuard';

router.beforeEach(authGuard);

Vue.use(VueRouter);

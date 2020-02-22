import Vue from 'vue';
import VueRouter from 'vue-router';
import {router} from '@/router';
import {authGuard} from '@/guards/auth.guard';

router.beforeEach(authGuard);

Vue.use(VueRouter);

export default {
    path: '/',
    name: 'Index',
    meta: {
        title: '首页',
        order: 0
    },
    component: () => import('./index.vue')
};

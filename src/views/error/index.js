export default [
    {
        path: '/:pathMatch(.*)*',
        name: 'Error404',
        meta: {
            title: '404',
            order: 100000
        },
        component: () => import('./404.vue')
    }
]

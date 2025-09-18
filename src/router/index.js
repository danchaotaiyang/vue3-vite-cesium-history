import { createRouter, createWebHistory } from 'vue-router';
import errorRouters from '@/views/error/index.js';
import { $emitter } from '@/assets/js/mitt.js';
import { BRAND, USE_AUTHENTICATION } from '@/config';
import { useSignStore } from '@/store';


const modules = import.meta.glob('../view/**/index.js', { eager: true, import: 'default' });
const routerModules = [];

for (const key in modules) {
    let module = modules[ key ];
    let routes = Array.isArray(module) ? [ ...module ] : [ module ];
    routerModules.push(...routes);
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...errorRouters
    ]
});

let storeSign;

router.beforeEach((to) => {

    let { name, meta } = to;

    if (meta && meta[ 'title' ] && name !== 'Index') {
        document.title = `${ meta[ 'title' ] } - ${ BRAND }`;
    } else {
        document.title = BRAND;
    }

    if (USE_AUTHENTICATION) {

        if (!storeSign) {
            storeSign = useSignStore();
        }

        const { isAuthenticated } = storeSign;

        if (!isAuthenticated) {
            return { name: 'Sign' };
        }

        if (isAuthenticated) {
            return { name: 'Home' };
        }
    }

    return true;
});

export const routes = routerModules
    .sort((a, b) => {
        if (a.meta && typeof a.meta.order === 'number' && b.meta && typeof b.meta.order === 'number') {
            return a.meta.order - b.meta.order;
        } else {
            return a.name - b.name;
        }
    })
    .map(d => {
        router.addRoute(d);
        return d;
    });

export default router;

$emitter.on('navigateTo', (event) => {
    router.push(event);
});

import { childrenRouters } from '@/router/util';


const views = import.meta.glob('./*.vue', { eager: true, import: 'default' });
const components = import.meta.glob('./*.vue');

const basic = 'sign';

const children = childrenRouters(basic, views, components);

export default {
    path: `/${ basic }`,
    name: basic,
    meta: {
        order: 0
    },
    redirect: { name: children[ 0 ].name },
    children
};

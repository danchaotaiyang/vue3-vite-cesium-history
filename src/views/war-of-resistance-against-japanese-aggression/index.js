import { childrenRouters } from '@/router/util';


const views = import.meta.glob('./*.vue', { eager: true, import: 'default' });
const components = import.meta.glob('./*.vue');

const basic = 'war-of-resistance-against-japanese-aggression';

const children = childrenRouters(basic, views, components);

export default {
    path: `/${ basic }`,
    name: basic,
    meta: {
        title: '抗日战争',
        order: 1,
    },
    redirect: { name: children[ 0 ].name },
    children
};

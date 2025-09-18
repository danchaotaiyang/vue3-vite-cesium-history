import { createPinia } from 'pinia';
import persistedState from 'pinia-plugin-persistedstate';


const pinia = createPinia();
pinia.use(persistedState);

export default pinia;

export * from '@/store/module/basic';

export * from '@/store/module/knowledge';

export * from '@/store/module/auth';

export * from '@/store/module/war-of-resistance-against-japanese-aggression';

import { createApp } from 'vue';
import router from './router';
import pinia from './store';
import App from './App.vue';
import Components from './components';
import Directives from './directive';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';


const main = createApp(App);
main.use(router);
main.use(pinia);
main.use(ElementPlus, { locale: zhCn, size: 'small' });
main.use(Components);
main.use(Directives);
main.mount('#app');

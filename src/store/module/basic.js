import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';


export const useBasicStore = defineStore('basic', () => {

    const route = useRoute();

    const name = computed(() => {
        let { meta = {} } = route;
        return meta.title || '';
    });

    const menu = computed(() => {
        let { children = [] } = route[ 'matched' ][ 0 ];
        return children
            .filter(d => d.meta.menu)
            .map((item) => {
                return {
                    label: item.meta.title,
                    value: item.name
                };
            });
    });

    const isIndex = computed(() => {
        return route.name === 'Index';
    });

    return { name, menu, isIndex };
});
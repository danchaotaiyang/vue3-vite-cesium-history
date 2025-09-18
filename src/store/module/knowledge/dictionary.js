import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import source from './dictionary.json';


export const useDictionaryStore = defineStore('dictionary', () => {

    const dictData = ref({});

    const dictParse = ref({});

    const data = computed(() => {
        return dictData.value;
    });

    const parsed = computed(() => {
        return dictParse.value;
    });

    const setDictData = (data = []) => {

        let __data__ = Array.isArray(data) ? data : [ data ];

        for (const datum of __data__) {

            if (!datum.name || !Array.isArray(datum.data)) {
                continue;
            }

            let parse = {};

            for (const d of datum.data) {
                parse[ d.value ] = d.label;
            }

            dictParse.value[ datum.name ] = parse;
            dictData.value[ datum.name ] = datum.data;

            parse = null;
        }
    };

    setDictData(source);


    const getDictData = async () => {
        try {
        } catch (e) {
            console.warn(e);
        }
    };

    getDictData();
    return { data, parsed, setDictData };
});

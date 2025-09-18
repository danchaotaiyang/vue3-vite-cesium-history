<script setup>
import { onMounted } from 'vue';
import { useRecordOfJapaneseWarCrimesDuringTheInvasionOfChinaStore } from '@/store';


defineOptions({
    meta: {
        title: '日本侵华战争罪行录',
        order: 1
    }
});

const store = useRecordOfJapaneseWarCrimesDuringTheInvasionOfChinaStore();

onMounted(() => {
    store.createCesium();
});
</script>

<template>
<div :id="store.id" class="width-100-v height-100-v"></div>
</template>

<style lang="scss" scoped>

</style>
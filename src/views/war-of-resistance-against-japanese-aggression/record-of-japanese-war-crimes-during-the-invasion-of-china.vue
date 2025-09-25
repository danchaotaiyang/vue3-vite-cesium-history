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

<style lang="scss">
.cesium-timeline-ticTiny, .cesium-timeline-ticSub {
    display: none;
}
/* 隐藏小时级别的刻度线 */
.cesium-timeline-ticks .cesium-timeline-tick:not(.cesium-timeline-tickMajor) {
    display: none;
}

/* 或者更精确地控制显示 */
.cesium-timeline-ticks .cesium-timeline-tickHour {
    display: none;
}

.cesium-timeline-ticks .cesium-timeline-tickMinute {
    display: none;
}

.cesium-timeline-ticks .cesium-timeline-tickSecond {
    display: none;
}

/* 只显示主要的刻度线（通常是天级别） */
.cesium-timeline-ticks .cesium-timeline-tickMajor {
    display: block;
}
</style>
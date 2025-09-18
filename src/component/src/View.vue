<script setup>
defineOptions({
    name: 'AppView'
});
</script>

<template>
<router-view v-slot="{ Component }">
    <transition appear name="fade">
        <suspense>
            <div class="width-100-v height-100-v"><component :is="Component"></component></div>
            <template #fallback>
            <div class="d-flex justify-content-center align-items-center">加载中……</div>
            </template>
        </suspense>
    </transition>
</router-view>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
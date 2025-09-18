<template>
404
</template>

<script setup>
import { useRouter } from 'vue-router';


const router = useRouter();

let timer;

timer = setTimeout(() => {
    router.replace({ path: '/' });
    clearTimeout(timer);
}, 3000);
</script>

<style lang="scss" scoped>

</style>

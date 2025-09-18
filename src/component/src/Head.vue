<script setup>
import { reactive } from 'vue';
import { BRAND } from '@/config';


const state = reactive({
    BRAND
});

defineOptions({
    name: 'AppHead'
});
</script>

<template>
<div class="header">
    {{ state.BRAND }}
</div>
</template>

<style lang="scss" scoped>

</style>

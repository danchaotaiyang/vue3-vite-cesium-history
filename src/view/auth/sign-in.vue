<script setup>
import { useSignStore } from '@/store';


defineOptions({
    meta: {
        title: '登录',
        order: 0
    }
});

const store = useSignStore();
</script>

<template>
<div class="sign-in">
    sign-in
</div>
</template>

<style scoped lang="scss">
.sign-in {
    height: 300px;
    background-color: #ccc;
}
</style>

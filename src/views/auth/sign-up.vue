<script setup>
import { useSignStore } from '@/store';


defineOptions({
    meta: {
        title: '注册',
        order: 0
    }
});

const store = useSignStore();
</script>

<template>
<div class="sign-up">
    sign-up
</div>
</template>

<style scoped lang="scss">
.sign-up {
    height: 300px;
    background-color: #ccc;
}
</style>

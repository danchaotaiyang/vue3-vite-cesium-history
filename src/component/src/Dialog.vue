<script setup>
import { markRaw, readonly, ref } from 'vue';
import { $emitter } from '@/asset/js/mitt.js';


defineOptions({
    name: 'AppDialog',
    inheritAttrs: false
});

const dialogs = ref({});

const eventDialogClose = (dialog) => {
    dialog.visible = false;
};

$emitter.on('dialog', (dialog) => {

    let { name = 'dialog', key = new Date().getTime(), content, props, data } = dialog;

    dialogs.value[ name ] = {
        name, key,
        content: markRaw(content),
        props: readonly(props),
        data: readonly(data),
        visible: true
    };
});
</script>

<template>
<el-dialog v-for="item in dialogs" :key="item.key" v-model="item.visible" v-bind="item.props" @close="eventDialogClose(item)">
    <component :is="item.content" :data="item.data"></component>
</el-dialog>
</template>

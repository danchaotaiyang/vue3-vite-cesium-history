<script setup>
import { useSlots } from 'vue';
import { Loading } from '@element-plus/icons-vue';


const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    empty: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    }
});

const slots = useSlots();
</script>

<template>
<div class="position-relative d-flex flex-column justify-content-between align-items-stretch border-box height-100-p panel">
    <div class="d-flex justify-content-center align-items-center panel-head">
        {{ props.title }}
    </div>
    <div class="position-relative flex-fill height-10 panel-body">
        <transition appear name="fade-loading">
            <template v-if="props.loading">
            <div class="position-absolute top-0 left-0 right-0 bottom-0 d-flex flex-column justify-content-center align-items-center height-100-p">
            <el-icon :size="24" class="is-loading">
                    <Loading />
                </el-icon>
            <div class="margin-top-10">加载中…</div>
            </div>
            </template>
        </transition>
        <transition appear name="fade-empty">
            <template v-if="!props.loading && props.empty">
            <div class="position-absolute top-0 left-0 right-0 bottom-0 d-flex flex-column justify-content-center align-items-center height-100-p">
                <template v-if="slots.empty">
                <slot name="empty"></slot>
                </template>
                <template v-else>
            	<el-empty :description="props.empty" image="/static/bgi-empty.png" />
                </template>
            </div>
            </template>
        </transition>
        <transition appear name="fade-content">
            <template v-if="!props.loading && !props.empty">
            <slot></slot>
            </template>
        </transition>
    </div>
</div>
</template>

<style scoped lang="scss">
.fade-loading-enter-active,
.fade-loading-leave-active {
    transition: all .5s ease;
}

.fade-loading-enter-from,
.fade-loading-leave-to {
    opacity: 0;
}

.fade-empty-enter-active,
.fade-empty-leave-active {
    transition: all .5s ease .25s;
}

.fade-empty-enter-from,
.fade-empty-leave-to {
    opacity: 0;
}

.fade-content-enter-active,
.fade-content-leave-active {
    transition: all .5s ease .25s;
}

.fade-content-enter-from,
.fade-content-leave-to {
    opacity: 0;
}

.panel-head {
    background: #444444;
}

.panel-body {
    background: #333333;
}
</style>

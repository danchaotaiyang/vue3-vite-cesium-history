<script setup>
import { computed, ref } from 'vue';


defineOptions({
    name: 'AppParams'
});

const props = defineProps({
    total: {
        type: Number
    },
    more: {
        type: Boolean,
        default: false
    }
});

const emits = defineEmits([ 'search', 'reset' ]);

const other = ref(false);

const total = computed(() => {
    return typeof props.total !== 'undefined';
});

const eventSearch = () => {
    emits('search');
};

const eventReset = () => {
    emits('reset');
};
</script>

<template>
<div class="d-flex justify-content-between align-items-start margin-y-15 params">
    <div class="d-flex align-items-start fit-content">
        <div :class="{ 'height-36': props.more && !other }" class="d-flex overflow-hidden">
            <slot></slot>
        </div>
        <div class="d-flex flex-nowrap margin-y-5">
            <el-button @click.stop="eventSearch" type="primary">查询</el-button>
            <el-button @click.stop="eventReset" type="warning">重置</el-button>
            <div v-if="props.more" class="d-flex justify-content-center align-items-center border-box margin-left-10 user-select-none height-26">
                <div @click.stop="other = !other" class="d-flex align-items-center text-nowrap cursor-pointer">更多查询 <i :class="{ inversion: other }" class="d-flex justify-content-center align-items-center width-12 height-12 margin-left-8 border-radius-2 icn-more"></i></div>
            </div>
        </div>
    </div>
    <div class="padding-y-8 padding-left-50 text-nowrap">
        
    </div>
</div>
</template>

<style lang="scss" scoped>
.params {
    .el-form-item.el-form-item--small {
        margin: 5px 12px 5px 0;
    }
}

.icn-more {
    background-color: rgba(0, 0, 0, .5);
    border: 1px solid rgba(0, 0, 0, .8);

    &:after {
        content: '';
        width: 0;
        height: 0;
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        border-top: 3px solid #858585;
    }

    &.inversion:after {
        transform: rotateX(180deg) translateY(1px);
    }
}
</style>


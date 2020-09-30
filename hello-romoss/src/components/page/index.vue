<template>
    <a-pagination @change="onChange" :total="total" v-model:current="current" v-model:pageSize="pageSize" :hideOnSinglePage="true" show-less-items/>
</template>

<script>
import { reactive, computed, ref, onMounted } from "vue";

export default {
    name: 'pagination',
    props: {
        total: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 20
        }
    },
    setup(props, ctx) {
        let current = ref(1);
        function onChange(e) {
            current = e
            // 触发emit方法通知父组件
            ctx.emit('getData', e)
        }
        return {
            onChange,
            current
        }
    }
}
</script>
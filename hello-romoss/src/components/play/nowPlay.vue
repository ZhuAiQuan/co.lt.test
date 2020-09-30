<template>
    <audio :src="url" :autoplay="autoplay" :loop="loop" :preload="preload" id="play" ref="play"></audio>
</template>

<script>
import { nextTick, onMounted, ref, watch } from 'vue'
export default {
    name: 'nowPlay',
    props: {
        url: {
            type: String,
            default: "",
        },
        autoplay: {
            type: String,
            default: 'autoplay'
        },
        loop: {
            type: String,
            default: 'loop'
        },
        preload: {
            type: String,
            default: 'none' // "none" 不缓冲文件 "auto" 缓冲音频文件 "metadata" 仅仅缓冲文件的元数据
        }
    },
    setup(props) {
        let dom = ref(null)
        const play = ref(null)
        onMounted(() => {
            dom = document.getElementById('play');
            console.log(props.url)
        })
        watch(props.url, (val) => {
            if (val) {
                console.log(val)
            }
        })
    }
}
</script>
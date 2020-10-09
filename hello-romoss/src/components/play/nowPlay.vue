<template>
    <audio :src="url" :autoplay="autoplay" :loop="loop" :preload="preload" id="play" ref="play"></audio>
</template>

<script>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex'
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
        const store = useStore();
        let dom = ref(null);
        const play = ref(null);
        const lyric = computed(() => props.url)
        onMounted(() => {
            dom = document.getElementById('play');
        })
        watch(lyric, (val) => {
            if (val) {
                dom = document.getElementById('play');
                store.commit('GetAudioRef', dom)
            }
        })
    }
}
</script>
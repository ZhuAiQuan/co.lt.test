<template>
  <div class="content">
    <div
      class="bg-position"
      :style="{ backgroundImage: `url(${bgImg})` }"
    ></div>
    <div class="bg-content">
      <div class="songName">{{ songDetail.list.name }}</div>
      <div class="songs">
        {{ songDetail.list.artists.map((item) => item.name).join(" / ") }}
      </div>
      <div class="lyc-content">
        <p v-for="item in songDetail.txt" :key="item">{{ item }}</p>
      </div>
      <div class="footer-bar">
        <div>list</div>
        <div>last</div>
        <div v-show="state" @click="playMusic">play</div>
        <div v-show="!state" @click="pauseMusic">pause</div>
        <div>next</div>
        <div>loop</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from "vue";
import axios from "axios";
import { useStore } from "vuex";
export default {
  name: "right-content",
  props: {
    id: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "320", // 128, 320, flac, 返回歌曲链接的码率 默认 320，
    },
  },
  setup(props) {
    const store = useStore();
    const audio = computed(() => store.state.audio);
    console.log(store, audio)
    const palyId = computed(() => store.state.id);
    const state = ref(false)
    let bgImg = ref("");
    let songDetail = reactive({
      list: {
        name: "",
        artists: [],
        album: {},
      },
      txt: [],
      time: [],
    });
    function getDetail(val) {
      const { type } = props;
      const params = {
        id: val,
        type,
      };
      axios
        .get("/api/song", {
          params,
        })
        .then((res) => {
          songDetail.list = res.data.data;
          bgImg.value = `${res.data.data.album.picUrl}`;
          const { cid } = songDetail.list;
          getLyric(cid);
          /**
                    album: {
                        name, id, picUrl
                    }
                    artists: [
                        {
                            id, name, nameSpelling
                        }
                    ]
                    cid, desc, id, name, url
                
                 */
        });
    }
    function getLyric(cid = 0) {
      if (cid) {
        songDetail.time = [];
        const params = {
          cid,
        };
        axios
          .get("/api/lyric", {
            params,
          })
          .then((res) => {
            const lyric = res.data.data;
            const reg = /[\r\n]/g;
            const txt = lyric
              .split(reg)
              .map((item) => {
                if (item.length) {
                  const end = item.indexOf("]");
                  return item.substring(end + 1, item.length);
                } else return item;
              })
              .filter((item) => item);
            songDetail.txt = txt;
            const time = lyric.split("]");
            for (let i = 0; i < time.length; i++) {
              if (time[i].indexOf("[") === 0) {
                time[i] = time[i].substring(1, time[i].length);
              } else if (time[i].indexOf("[") === -1) {
                time.splice(i, 1);
              } else {
                const ins = time[i].indexOf("[");
                time[i] = time[i].substring(ins + 1, time[i].length);
              }
              // time[i].substring(2, time[i].length)
            }
            for (let i = 0; i < time.length; i++) {
              const arr = time[i].split(":").map(Number);
              if (!arr[0]) {
                time.splice(i, 1);
              }
              songDetail.time.push(arr[0] * 60 + arr[1]);
            }
            // 时间滚动暂无头绪
          });
      }
    }
    function handler(data) {
      console.log(data);
    }

    function playMusic() {
      state.value = false
      store.dispatch('pause', !state.value)
    }
    function pauseMusic() {
      state.value = true;
      store.dispatch('pause', !state.value)
    }
    watch(palyId, (val) => {
      if (val) {
        getDetail(val);
      }
    });
    return {
      getDetail,
      songDetail,
      bgImg,
      state,
      playMusic,
      pauseMusic
    };
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 300px;
  height: 500px;
  text-align: center;
  position: fixed;
  right: 0;
  bottom: 0;
  color: #000;
  .songName {
    font-size: 16px;
    font-weight: 800;
    color: #fff;
    line-height: 20px;
  }
  .songs {
    color: #fff;
    line-height: 18px;
  }
  .lyc-content {
    height: 400px;
    overflow-y: auto;
    color: #fff;
  }
  .lyc-content::-webkit-scrollbar {
    width: 1px;
  }
  .lyc-content > p:hover {
    color: aqua;
    cursor: pointer;
  }
  .bg-position {
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(5px);
    z-index: 1;
    background-position: center;
    background-size: cover;
  }
  .bg-content {
    position: relative;
    z-index: 2;
    padding-top: 30px;
    .footer-bar {
      height: 32px;
      display: flex;
      padding: 0 70px;
    }
    .footer-bar > div {
      width: 32px;
      height: 100%;
      cursor: pointer;
    }
    .footer-bar > div:hover{
      color: red;
    }
  }
}
</style>
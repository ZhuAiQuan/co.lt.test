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
      <div class="lyc-content"></div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from "vue";
import axios from "axios";
import { useStore } from "vuex";
// const LyricParser = require("lc-lyric-parser");
import Lyric from 'lyric-parser'
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
    const palyId = computed(() => store.state.id);
    let bgImg = ref("");
    let songDetail = reactive({
      list: {
        name: "",
        artists: [],
        album: {},
      },
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
            const txt = lyric.split(reg).map(item => {
              if (item.length) {
                const end = item.indexOf(']')
                return item.substring(end + 1, item.length)
              } else return item
            })
            console.log(txt)
          });
      }
    }
    function handler(data) {
        console.log(data)
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
  .lcy-content {
    height: 400px;
    overflow-y: auto;
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
  }
}
</style>
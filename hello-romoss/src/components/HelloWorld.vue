<template>
  <div class="search-content">
    <div class="search-input">
      <a-input
        allowClear
        v-model:value="searchKeyword"
        placeholder="请输入歌曲，歌手，专辑等"
        @pressEnter="onSearch"
      />
      <a-button type="primary" class="search-btn" @click="onSearch"
        >查询</a-button
      >
    </div>
    <div class="search-list">
      <div class="list-item" v-for="item in searchData.data" :key="item.id">
        <div class="avator">
          <img :src="item.album.picUrl" :alt="item.album.name" />
        </div>
        <div class="content">
          <div class="name" @click="playItem(item)">
            <span>{{ item.name }}</span>
            -
            <span>{{
              item.artists.map(item => item.name).toString()
            }}</span>
          </div>
          <div class="artists">{{ item.album.name }}</div>
        </div>
      </div>
    </div>
    <pagination ref="pagination" @getData="emitSearch" :total="total" />
    <now-play ref="musicPlay" :url="url" />
  </div>
</template>

<script>
import { reactive, computed, ref, nextTick, onMounted, watch } from "vue";
import { useStore } from 'vuex'
import axios from "axios";
import pagination from "./page/index.vue"
import nowPlay from "./play/nowPlay.vue"

export default {
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    const store = useStore();
    console.log(store)
    let searchKeyword = ref("");
    let total = ref(0);
    let pageNo = ref(1)
    let searchData = reactive({
      data: [],
    });
    let url = ref('');
    let musicPlay = ref(null);
    let nowId = ref(null)

    function onSearch() {
      axios
        .get("/api/search", {
          params: {
            keyword: searchKeyword.value,
            pageNo: pageNo.value
          },
        })
        .then(res => {
          searchData.data = res.data.data.list;
          total.value = res.data.data.total
        });
    }
    function emitSearch(e) {
      pageNo.value = e
      onSearch()
    }
    function playItem(row) {
      url.value = row.url;
      nowId.value = row.id,
      store.commit('SetMusicId', row.id)
    }
    onMounted(() => {
      // console.log(musicPlay.value)
    })

    return {
      onSearch,
      searchKeyword,
      searchData,
      total,
      emitSearch,
      playItem,
      musicPlay,
      url,
      nowId
    };
  },
  components: {
    pagination,
    nowPlay
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
.search-input {
  display: flex;
  .search-btn {
    margin-left: 10px;
  }
}
.search-list {
  margin-top: 10px;
  padding-left: 10px;
  .list-item {
    display: flex;
    background: #fff;
    margin-bottom: 10px;
    .avator {
      width: 90px;
      height: 90px;
      margin: 5px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .content {
      margin-left: 30px;
      text-align: left;
      &>div{
        height: 50%;
        cursor: pointer;
      }
      .name{
        line-height: 70px;
      }
      .artists{
        font-weight: 600;
      }
    }
  }
  .list-item:hover{
    box-shadow: 0px 0px 5px #ccc; 
  }
}
</style>

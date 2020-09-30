import { createStore } from 'vuex'

export default createStore({
  state: {
    songs: {},
    id: ''
  },
  mutations: {
    SetSongs(state, row) {
      state.songs = row
    },
    SetMusicId(state, id) {
      state.id = id
    }
  },
  actions: {
  },
  modules: {
  }
})

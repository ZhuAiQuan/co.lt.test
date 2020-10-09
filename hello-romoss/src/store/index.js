import { createStore } from 'vuex'

export default createStore({
  state: {
    songs: {},
    id: '',
    audio: null
  },
  mutations: {
    SetSongs(state, row) {
      state.songs = row
    },
    SetMusicId(state, id) {
      state.id = id
    },
    GetAudioRef(state, ref) {
      state.audio = ref;
    }
  },
  actions: {
    pause(store, status) {
      if (status) {
        store.state.audio.play()
      } else {
        store.state.audio.pause()
      }
    }
  },
  modules: {
  }
})

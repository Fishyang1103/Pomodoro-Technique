import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const time = parseInt(process.env.VUE_APP_TIME)
const timebreak = parseInt(process.env.VUE_APP_TIMEBREAK)

export default new Vuex.Store({
  state: {
    sound: 'alarm.mp3',
    items: [],
    current: '',
    finished: [],
    timeleft: time,
    break: false
  },
  mutations: {
    // state -> 上面的狀態
    // data -> 要傳進來的東西
    selectSound (state, data) {
      state.sound = data
    },
    additem (state, data) {
      state.items.push({
        name: data,
        edit: false,
        model: data
      })
    },
    edititem (state, data) {
      state.items[data].edit = true
    },
    delitem (state, data) {
      state.items.splice(data, 1)
    },
    submitedit (state, data) {
      state.items[data].name = state.items[data].model
      state.items[data].edit = false
    },
    canceledit (state, data) {
      state.items[data].model = state.items[data].name
      state.items[data].edit = false
    },
    delfinish (state, data) {
      state.finished.splice(data, 1)
    },
    start (state) {
      // shift 把陣列第一個東西拿掉並回傳
      state.current = state.break ? '小歇片刻' : state.items.shift().name
    },
    countdown (state) {
      state.timeleft--
    },
    finish (state) {
      if (!state.break) {
        state.finished.push(state.current)
      }
      // 結束的時候把目前的東西清空
      state.current = ''
      if (state.items.length > 0) {
        state.break = !state.break
      }
      // 重設倒數的秒數
      state.timeleft = state.break ? timebreak : time
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({ key: 'pomodoro' })
  ]
})

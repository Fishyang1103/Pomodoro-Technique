<template lang="pug">
//-倒數
#home
  b-container.home
    b-row
      b-col(cols="12")
        h1 {{ timeText }}
        h5 {{ currentText }}
        b-btn.lg(variant="dark" v-if="status !== 1" @click='start' ) Start
        b-btn.lg(variant="dark" v-if="status === 1" @click='pause') ||
</template>
<script>

export default {
  data () {
    return {
      // 0 停止
      // 1 倒數中
      // 2 暫停
      status: 0,
      timer: 0
    }
  },
  computed: {
    current () {
      return this.$store.state.current
    },
    items () {
      return this.$store.state.items
    },
    currentText () {
      return this.current.length > 0 ? this.current : this.items.length > 0 ? '點擊 Start' : ''
    },
    timeleft () {
      return this.$store.state.timeleft
    },
    timeText () {
      // 轉文字在補0
      const m = Math.floor(this.timeleft / 60).toString().padStart(2, '0')
      const s = Math.floor(this.timeleft % 60).toString().padStart(2, '0')
      return `${m} : ${s}`
    }
  },
  methods: {
    start () {
      // 什麼都沒有的開始 且 清單內有東西
      if (this.status === 0 && this.items.length > 0) {
        this.$store.commit('start')
      }
      if (this.current.length) {
        this.status = 1
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= -1) {
            this.finish(false)
          }
        }, 1000)
      }
    },
    pause () {
      this.status = 2
      clearInterval(this.timer)
    },
    finish (skip) {
      clearInterval(this.timer)
      this.status = 0
      this.$store.commit('finish')

      if (!skip) {
        const audio = new Audio()
        audio.src = require('@/assets/' + this.$store.state.sound)
        audio.play()
      }

      if (this.items.length > 0) {
        this.start()
      }
    }
  }
}
</script>

<style scoped>
.home{
  font-weight: bold;
  position: absolute;
  top:210%;
  left: 26.5%;
}

.lg{
  width: 100px;
  text-align: center;
  position: absolute;
  left: 6%;
  top: 140%;
}

h1{
  font-size: 70px;
}

h5{
  position: absolute;
  left: 6%;
}
</style>

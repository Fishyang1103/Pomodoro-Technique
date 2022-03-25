<template lang="pug">
#app
  #top
    b-container
      h2 トマトの時計
      hr
      b-btn.btn1(to='/list') Check list
      b-btn.btn2(to='/settings') Daily report
    Home
  #contect
    //- keep-alive => 因為 setInterval 的關係，沒有的話換頁之後暫停鍵會消失，變開始鍵
    keep-alive(include="Settings")
      router-view
        List
</template>

<style scope>
#app {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url(../src/assets/Bitmap.png) no-repeat;
  background-position: 20% 65%;
}

#top {
  position: relative;
  top: 15%;
}

.btn1,
.btn2 {
  background: white;
  color: black;
  position: relative;
  border: none;
  left: 50%;
  top: 80%;
  font-size: 1.5rem;
  margin: 0px 10px;
}

.btn1:hover {
  background: white;
  color: black;
  border: none;
}

.btn2:hover {
  background: white;
  color: black;
  border: none;
}

h2 {
  font-style: italic;
}
</style>

<script>
import Home from './views/Home.vue'
import List from './views/List.vue'

export default {
  name: 'App',
  components: {
    Home,
    List
  }
}
</script>

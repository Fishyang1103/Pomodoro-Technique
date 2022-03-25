<template lang="pug">
#settings
  b-container
    table.table
        tr
          td.h4 Data
          td.h4 Finished
          td.h4 Restart
        tr
          td 27 Jun,2019
          td 8
          td 3
        tr
          td 23 Jun,2019
          td 8
          td 3
        tr
          td 20 Jun,2019
          td 8
          td 3
</template>
<style scope>
#settings{
  position: absolute;
  left: 50%;
  top: 35%;
}

.noborder{
  border: none;
}

.table{
  width: 500px;
  border: none;
}

</style>

<script>
export default {
  // 放鬧鈴進來
  data () {
    return {
      items: [
        { name: '鬧鈴', src: 'alarm.mp3' },
        { name: 'yay', src: 'yay.mp3' }
      ],
      fields: [
        { key: 'name', label: '名稱' },
        { key: 'src', label: '試聽' },
        { key: 'select', label: '選擇' }
      ]
    }
  },
  methods: {
    select (item) {
      this.$store.commit('selectSound', item.src)
    }
  },
  computed: {
    sound () {
      return this.$store.state.sound
    }
  }
}
</script>

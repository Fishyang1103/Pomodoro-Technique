<template lang="pug">
#list
  b-container
    b-row
      b-col(cols="2")
        b-btn.btnadd(variant='light' @click='additem') +
      b-col(cols="10")
        b-form-group.title(label="What are going to do today?" label-for="newinput" invalid-feedback='請至少輸入兩個字')
          b-form-input#newinput(v-model='newinput' :state='newinputstate' @keydown.enter="additem")
    hr
    b-row
      b-col(cols="12")
        h4 To-do
        //- empty 寫預設畫面
        b-table.table(:items="items" :fields="fields" show-empty)
          template(#empty)
            b-icon-square
            p.ml-3 Read a book.
            br
            b-icon-square
            p.ml-3 Have a great coffee.
            br
            b-icon-square
            p.ml-3 Watch Netflix.
          template(#cell(name)="data")
            b-icon-square
            b-form-input(v-if="data.item.edit" v-model="data.item.model" trim:state="data.item.state" @keydown.enter="submitedit(data.index)" @keydown.esc="canceledit(data.index)")
            span(v-else) {{ data.value }}
          template(#cell(action)="data")
            span(v-if="data.item.edit")
              b-btn.mx-1.dark-pen(variant="dark")
                b-icon-check.mr-0(@click="submitedit(data.index)")
              b-btn.mx-1(variant="danger")
                b-icon-arrow-counterclockwise.mr-0(@click="canceledit(data.index)")
            span(v-else)
              b-btn.mx-1.dark-pen(variant="dark")
                b-icon-pencil.mr-0(@click="edititem(data.index)")
              b-btn.mx-1(variant="danger")
                b-icon-trash.mr-0(@click="delitem(data.index)")
        h4 Done
        //- b-table.table2(:items="items" :fields1="fields1" show-empty)
        //-   template(#empty)
        //-     b-icon-check-square
        //-     p.ml-3 Buy nitendo switch.
        b-table-simple
          thead
            tr
          tbody
            tr(v-for="(item, idx) in finished")
              td {{ item }}
              td
                b-btn(variant="danger" @click="delfinish(idx)")
                  b-icon-trash
            tr(v-if="finished.length === 0")
              td.text-center(colspan="2") 沒有項目
</template>

<style scope>
#list{
  width: 30%;
  height: 40%;
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 25%;
}

.title{
  display: inline-block;
}

.btnadd{
  display: inline-block;
  border: 1px solid black;
  border-radius: 100%;
  font-size: 1rem;
  position: absolute;
  top:20%;
}

#newinput{
  display: inline-block;
}

p{
  display: inline-block;
}

.b-icon.bi{
  margin-right: 20px;
}

.table td{
  border-top:none;
}

hr{
  border:1px solid black
}

table{
  border-color:white;
}

.table td, .table th{
  border-top:none;
}

thead{
  border-color: none;
}

tbody{
  border-color: none;
}

.btn-danger{
  width: 40px;
  margin: 0px 4px;
  padding: 1px 9px;
}

.dark-pen
{
  width: 40px;
  margin: 0px 4px;
  padding: 1px 9px;
}

</style>

<script>
export default {
  data () {
    return {
      newinput: '',
      fields: [
        { key: 'name', label: '' },
        { key: 'action', label: '' }
      ]
      // fields1: [
      //   { key: 'name', label: '名稱' },
      //   { key: 'action', label: '操作' }
      // ]
    }
  },
  computed: {
    newinputstate () {
      return this.newinput.length > 2 ? true : this.newinput.length === 0 ? null : false
    },
    // 從 store 拉過來
    // v-modeal 改變時就會 computed
    items () {
      return this.$store.state.items.map(item => {
        item.state = item.model.length > 2
        return item
      })
    },
    finished () {
      return this.$store.state.finished
    }
  },
  methods: {
    additem () {
      if (this.newinput.length > 2) {
        this.$store.commit('additem', this.newinput)
        this.newinput = ''
      }
    },
    edititem (index) {
      this.$store.commit('edititem', index)
    },
    delitem (index) {
      this.$store.commit('delitem', index)
    },
    submitedit (index) {
      if (this.items[index].state) {
        this.$store.commit('submitedit', index)
      }
    },
    canceledit (index) {
      this.$store.commit('canceledit', index)
    },
    delfinish (index) {
      this.$store.commit('delfinish', index)
    }
  }
}
</script>

<template>
  <button @click="handleClick">
    <slot></slot>
  </button>
</template>
<script>
  import Emitter from '../mixins/emitter'
  export default {
    mixins:[
      Emitter
    ],
    inject:['name'],
    methods: {
      handleClick (event) {
        console.log('button 事件')
        // this.$emit('on-click', 'hahaha');
        this.dispatch('test','on-click','hahah')
      }
    },
    mounted(){
      console.log(this.name)
    }
  }
</script>
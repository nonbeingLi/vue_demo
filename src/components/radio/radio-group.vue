<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
  import { findComponentsDownward } from '../../utils/assist.js';
  import Emitter from '../../mixins/emitter.js';
  export default {
    name:'iRadioGroup',
    mixins:[Emitter],
    props:{
      value:{
        type:[Number,Boolean,String]
      }
    },
    data(){
      return{
        currentValue: this.value,
        childrens:[]
      }
    },
    methods:{
      updateModel(update){
        this.childrens = findComponentsDownward(this,'iRadio');
        if(this.childrens){
          const { value } = this;
          this.childrens.forEach(child=>{
            child.model = value;
            if(update){
              child.currentValue = child.label === value;
              child.group = true;
            }
          })
        }
        
      },
      change(data){
        this.currentValue = data; // 记录当前值
        this.$emit('input',data); // 修改value
        this.$emit('on-change',data)
        this.dispatch('iFormItem','on-form-change',this.value)        
      },
    },
    mounted () {
      this.updateModel(true);
    },
    watch: {
      value () {
        this.updateModel(true);
      }
    }
  }
</script>


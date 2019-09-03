<template>
  <label>
    <input type="radio" v-if="group"
      :disabled='disabled'
      :value="label"
      v-model="model"
      @change="change"
    >
    
    <input type="radio" v-else
      :disabled='disabled'
      :checked="currentValue"
      @change="change"
    >
    <slot></slot>
  </label>
</template>

<script>
  import { findComponentUpward } from '../../utils/assist.js';
  import Emitter from '../../mixins/emitter.js';
  export default {
    mixins:[Emitter],
    name:'iRadio',
    props:{
      disabled:{
        type:Boolean,
        default:false,
      },
      value:{
        type:[Number,String,Boolean],
        default:false
      },
      trueValue:{
        type:[Number,String,Boolean],
        default:true
      },
      falseValue:{
        type:[Number,String,Boolean],
        default:false
      },
      label:{
        type:[Number,String,Boolean],
      }
    },
    data(){
      return{
        currentValue:this.value,

        model:'',
        group:false,
        parent:null,
      }
    },
    watch:{
      value(val){
        if (val === this.trueValue || val === this.falseValue) {
          this.updateModel();
        } else {
          throw 'Value should be trueValue or falseValue.';
        }
      }
    },
    mounted(){
      this.parent = findComponentUpward(this,'iRadioGroup');
      if(this.parent){
        this.group = true;
      }
      if(this.group){
        this.parent.updateModel(true)
      }else{
        this.updateModel()
      }
    },
    methods:{
      change(event){
        if(this.disabled) return false;

        const checked=event.target.checked;
        this.currentValue = checked;

        const value = checked? this.trueValue:this.falseValue;
        
        this.$emit('input',value);
        if(this.group){
          checked? this.parent.change(this.label):''
        }else{
          this.$emit('on-change',value)
          this.dispatch('iFormItem','on-form-change',value)
        }
      },
      updateModel(){
        this.currentValue= this.value===this.trueValue;
      }
    }
  }
</script>


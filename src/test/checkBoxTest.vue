<template>
<div>


  <i-checkbox v-model="single">单独选项</i-checkbox>
  <i-checkbox v-model="single1" trueValue='yes' falseValue='no'>trueValue与falseValue</i-checkbox>

  <i-checkbox-group v-model="multiple">
    <i-checkbox label="option1">选项 1</i-checkbox>
    <i-checkbox label="option2">选项 2</i-checkbox>
    <i-checkbox label="option3">选项 3</i-checkbox>
    <i-checkbox label="option4">选项 4</i-checkbox>
  </i-checkbox-group>
  
  <i-radio v-model="radio">单选</i-radio>
  <i-radio-group v-model="phone">
    <i-radio label="apple">apple</i-radio>
    <i-radio label="android">android</i-radio>
    <i-radio label="windows">windows</i-radio>
  </i-radio-group>
  </div>
</template>
<script>
  import iCheckbox from '../components/checkbox/checkbox'
  import iRadio from '../components/radio/radio'
  import iCheckboxGroup from '../components/checkbox/checkbox-group'
  import iRadioGroup from '../components/radio/radio-group'
  export default {
    components:{
      iCheckbox,iCheckboxGroup,iRadio,iRadioGroup
    },
    data () {
      return {
        single: false,
        radio:false,
        single1:'yes',
        phone:'apple',
        multiple: ['option1', 'option3']
      }
    }
  }
</script>

<template>
<!-- <input>`、`<slot>` 都是包裹在一个 `<label>` 元素内的，
  这样做的好处是，当点击 `<slot>` 里的文字时，`<input>` 选框也会被触发，
  否则只有点击那个小框才会触发，那样不太容易选中，影响用户体验 -->
  <label>
    <span>
      <input
        v-if="group"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        v-model="model"
        @change="change">
      <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        @change="change">
    </span>
    <slot></slot>
  </label>
</template>

<script>
import { findComponentUpward } from '../../utils/assist.js';
import Emitter from '../../mixins/emitter.js';
export default {
  mixins:[Emitter],
  name:'iCheckbox',
  props:{
    value:{
      type: [String, Number, Boolean],
      default:false
    },
    disabled:{
      type:Boolean,
      default:false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    label: {
      type: [String, Number, Boolean]
    }
    
  },
  /**因为 `value` 被定义为 prop，它只能由父级修改，
   * 本身是不能修改的，在 `<input>` 触发 change 事件，
   * 也就是点击选择时，不能由 Checkbox 来修改这个 value，
   * 所以我们在 data 里定义了一个 `currentValue`，
   * 并把它绑定在 `<input :checked="currentValue">`，
   * 这样就可以在 Checkbox 内修改 `currentValue`。
   * 这是自定义组件使用 `v-model` 的“惯用伎俩” */
  data(){
    return{
      currentValue:this.value,

      // 组合组件参数
      model: [],
      group: false,
      parent: null
    }
  },
  watch: {
    value (val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        throw 'Value should be trueValue or falseValue.';
      }
    }
  },
  //通过 findComponentUpward 方法，来判断父级是否有 CheckboxGroup 组件
  mounted(){
    this.parent = findComponentUpward(this, 'iCheckboxGroup');

    if (this.parent) {
      this.group = true;
    }

    if (this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
    }
  },
  methods:{
    change(event){
      if(this.disabled){
        return false;
      }
      /**
       * currentValue` 仍然是布尔值（true / false），因为它是组件 Checkbox 自己使用的，
       * 对于使用者无需关心，而 value 可以是 String、Number 或 Boolean，
       * 这取决于 `trueValue` 和 `falseValue` 的定义
       */
      const checked = event.target.checked;
      this.currentValue = checked;

      const value = checked? this.trueValue:this.falseValue;
      // 作为单独组件时
      this.$emit('input',value);

      if (this.group) {
      /**Checkbox 新增的 prop： `label` 只会在组合使用时有效，结合 `model` 来使用
        当vue中当v-model是数组时，选中则label的值会push到数组中
      */
        this.parent.change(this.model);
      } else {
        this.$emit('on-change', value);
        console.log('value',value)
        // 作为表单的组件时 来做数据校验
        this.dispatch('iFormItem', 'on-form-change', value);
      }      
    },
    updateModel () {
      this.currentValue = this.value === this.trueValue;
    }
  }
}
</script>


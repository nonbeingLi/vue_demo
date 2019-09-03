<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
  import { findComponentsDownward } from '../../utils/assist.js';
  import Emitter from '../../mixins/emitter.js';

  export default {
    mixins: [ Emitter ],
    name: 'iCheckboxGroup',    
    props: {
      value: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    data () {
      return {
        currentValue: this.value,
        childrens: []
      };
    },
    methods: {
      updateModel (update) {
        this.childrens = findComponentsDownward(this, 'iCheckbox');
        if (this.childrens) {
          const { value } = this;
          this.childrens.forEach(child => {
            child.model = value;  //子的model与父相同
            // 子更新数据时 对所有子节点更新
            if (update) {
              child.currentValue = value.indexOf(child.label) >= 0; //？
              child.group = true;
            }
          });
        }
      },
      // 由子组件触发 将当前选中的值传给父组件
      change (data) {
        this.currentValue = data;
        this.$emit('input', data);
        this.$emit('on-change', data);
        this.dispatch('iFormItem', 'on-form-change', data);
      }
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

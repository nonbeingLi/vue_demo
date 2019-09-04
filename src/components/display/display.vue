<!-- display.vue -->
<template>
  <div ref="display"></div>
</template>
<script>
  import Vue from 'vue'
  import randomStr from '../../utils/random_str.js';
  export default {
    props: {
      code: {
        type: String,
        default: ''
      }
    },
    data () {
      //父级传递 `code` 后，将其分割，并保存在 data 的 html、js、css 中，后续使用
      return {
        html: '',
        js: '',
        css: '',
        component: null,
        id:randomStr()
      }
    },
    watch:{
      code(){
        this.destroyCode();
        this.renderCode();
      }
    },
    methods: {
      /**
       * - source：.vue 文件代码，即 props: code；
        - type：分割的部分，也就是 template、script、style。
       */
      getSource (source, type) {
        const regex = new RegExp(`<${type}[^>]*>`);
        let openingTag = source.match(regex);

        if (!openingTag) return '';
        else openingTag = openingTag[0];

        return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`));
      },
      // 切割code
      splitCode () {
        // 替换为return是为将字符串转对象做准备
        const script = this.getSource(this.code, 'script').replace(/export default/, 'return ');
        const style = this.getSource(this.code, 'style');
        const template = '<div id="app">' + this.getSource(this.code, 'template') + '</div>';

        this.js = script;
        this.css = style;
        this.html = template;
      },
      //用 `extend` 渲染组件了
      renderCode () {
        this.splitCode();

        if (this.html !== '' && this.js !== '') {
          // 将js字符串 转为 对象
          const parseStrToFunc = new Function(this.js)();

          parseStrToFunc.template =  this.html;
          const Component = Vue.extend( parseStrToFunc );
          this.component = new Component().$mount();

          this.$refs.display.appendChild(this.component.$el);
          // 处理css
          if(this.css!==''){
            const style=document.createElement('style');
            style.type = 'text/css';
            style.id = this.id;  // style添加id标识方便组件更新或销毁后对其处理
            style.innerHTML = this.css;
            document.getElementsByTagName('head')[0].appendChild(style);
          }
        }
      },
      //当 Display 组件销毁时，也要手动销毁 extend 创建的实例以及上面的 css：
      destroyCode(){
        // 移除css
        const $target = document.getElementById(this.id);
        if ($target) $target.parentNode.removeChild($target);
        // 移除内容
        if (this.component) {
          this.$refs.display.removeChild(this.component.$el);
          //完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
          this.component.$destroy();
          this.component = null;
        }
      },
      
    },
    mounted () {
      this.renderCode();
    },
    beforeDestroy(){
      this.destroyCode();
    }
  }
</script>
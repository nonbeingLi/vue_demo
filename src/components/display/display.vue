<!-- display.vue -->
<template>
  <div ref="display"></div>
</template>
<script>
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
        }
      }
    },
    mounted () {
      this.renderCode();
    }
  }
</script>
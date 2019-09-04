import Alert from './alert.vue'
import Vue from 'vue'

/**
 * alert.vue 会被 Webpack 的 vue-loader 编译，把 template 编译为
 *  Render 函数，最终就会成为一个 JS 对象，自然可以对它进行扩展
 */
Alert.newInstance = properties=>{
  const props = properties || {};

  const Instance = new Vue({
    data:props,   // 进行响应
    render(h){
      return h(Alert,{
        props:props
      })
    }
  })

  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  
  const alert = Instance.$children[0];
  //alert 就是 Render 的 Alert 组件实例

  //使用闭包暴露了两个方法 `add` 和 `remove`
  return {
    add (noticeProps) {
      alert.add(noticeProps);
    },
    remove (name) {
      alert.remove(name);
    }
  }
}

export default Alert;
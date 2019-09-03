
// 上级向下级广播事件
function broadcast(componentName,eventName,params){
  this.$children.forEach(child => {
    const name = child.$options.name;
    if(componentName === name){
      child.$emit.apply(child,[eventName,params])
    }else{
      broadcast.apply(child,[componentName,eventName,params])
    }
  });
}

export default{
  methods:{
    dispatch(componentName,eventName,params){
      // console.log('componentName',componentName,'eventName',eventName)
      let _this = this;
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      while(parent && (!name||name!==componentName)){
        parent = parent.$parent;

        if(parent){
          name = parent.$options.name;
        }
      }
      if(parent){
        parent.$emit.apply(parent,[eventName,params])
        // 不用this.$emit是考虑跨级时 因此监听只能在create时用this.$on
      }
    },
    broadcast(componentName,eventName,params){
      broadcast.call(this,componentName, eventName, params)
    }
  }
}
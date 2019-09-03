<template>
    <div class="lytest">
        
        <div class="input-wrap">
            <ly-input  v-model="input1"  placeholder="请输入内容"></ly-input>
            {{input1}}
        </div>
       <div class="input-wrap">
            <ly-input  v-model="input" placeholder="请输入内容" search slot="append" icon="icon-search"></ly-input>
            {{input}}
        </div>
         <!-- 
        <div class="input-wrap">
            <ly-input key="12"  v-model="input"   placeholder="请输入内容" dateForm ></ly-input>
            {{input}}
        </div>
        <div class="input-wrap">
            <ly-input key="12"  v-model="input2" clearable  placeholder="请输入内容" ></ly-input>
            {{input2}}
        </div> 
            <ly-select v-model="val" :options="options" @selectValue="selectValue">
        </ly-select>
        <div class="input-wrap">
            <ly-switch v-model="delivery"></ly-switch>
        </div> -->
        <div class="input-wrap">
            <ly-input  type="textarea" autofocus rows="2" cols="2" v-model="textarea" placeholder="请输入内容"></ly-input>
        </div>
        <div class="input-wrap">
            <ly-button   @on-click="handleCl"></ly-button>
        </div>
        <!-- <div class="input-wrap">
            <ly-checkbox></ly-checkbox>
        </div> -->
    </div>
</template>
<script>
import lyInput from '@/components/lyInput'
import lyButton from '@/components/lyButton'
// import lySelect from '@/lyComponents/lySelect'
// import lySwitch from '@/lyComponents/lySwitch'
// import lyCheckbox from '@/lyComponents/lyCheckbox'

export default {
    name:'test',
    provide:{
      name:'Aresn'
    },
    data(){
        return{
            input:'',
            input1:'',
            input2:'',
            options:[
                {label:'sdf',value:'01'},
                {label:'erwf',value:'02'},
                {label:'sdfsd',value:'03'},
                // {label:'ffdb',value:'04'},
                // {label:'eww',value:'05'},
                // {label:'sdg',value:'06'},
                // {label:'w3sf',value:'07'},
                // {label:'hjk',value:'08'},
                // {label:'vgh',value:'09'},
            ],
            val:'',
            inputChangeFlag:true,
            delivery:true,
            textarea:'',
        }
    },
    components:{
        lyInput,
        lyButton,
    },
    methods:{
      showMessage(msg){
        console.log(msg)
      },
        handleCl(event){
          console.log('fuji 事件')
          console.log(event)
        },
        onChange(v){
            this.input = v;
            // console.log(v);
        },
        onTextAreaChange(v){
            this.textarea = v;
            // console.log(v);  
        },
        selectValue(v){
            this.val = v;
        }
    },
    created(){
      this.$on('on-click',this.showMessage)
    }
}
</script>
<style lang="less" scoped>
    .lytest{
        width: 400px;
        margin: 0 auto;
        border:1px solid gray;
        padding:10px;
        .input-wrap{
            margin-bottom: 20px;
        }
    }
</style>
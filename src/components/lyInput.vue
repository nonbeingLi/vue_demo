<template>
    <div :class="['ly-input',{'is_disabled': disabled,
    'is_preicon': hasPre,'is_suficon': hasSuf,'is_clear':is_clear
    }]" @mouseenter="hovering = true" @mouseleave="hovering = false">
        {{preicon}}
        <template v-if="type!='textarea'">
            <span v-if="hasPre" class="preicon">  <!-- 前置图标 -->
                <i class="icon-search"></i>
            </span>
            <input type="text" :value="value" @input="$emit('input',$event.target.value)" :disabled="disabled"  :min="minlength"
            :maxlength="maxlength" :placeholder="placeholder" :readonly="readonly"  class="ly-input_inner">
            {{disabled}}
            <!-- <slot name="down"></slot> -->
            <span v-if="is_clear && value" class="clear_wrap" @click="clearT">  <!-- 前置图标 -->
                <span class="clear">
                    <i :class="icon"></i>
                </span>
            </span>
            <!-- 后置内容  有样式才显示  获取焦点显示 一直显示-->
            <span v-if="hasSuf" class="suficon">  <!-- 前置图标 -->
                <i :class="icon"></i>
            </span>
        </template>
        <textarea v-else class="ly-textarea__inner" v-model="currentValue" :rows="rows"  :autofocus="autofocus" :placeholder="placeholder">

        </textarea>
    </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    data(){
        return{
            currentValue:this.value===null||this.value === undefined?'':this.value,
            inputDisabled:false,
            hovering:false,
            hasPre:false,
            hasSuf:false,
            preicon:null,
            is_clear:false
        }
    },
    props:{
        value:[String,Number],
        placeholder:{
            type:String,
            default:''
        },
        readonly:{
            type:String
        },
        type:[String],
        autofocus:[String],
        rows:[String],
        cols:[String],
        disabled:[String],
        maxlength:[String],
        minlength:[String],
        clearable:[String],
        search:[String],
        dateForm:[String],
        icon:String,
    },
    created(){
        
    },
    mounted(){
        if(this.disabled!==undefined){
            this.disabled = 'true';
        }
        if(this.search!==undefined){
            this.hasPre = true;
        }
        if(this.dateForm!==undefined){
            this.hasSuf = true;
        }
        if(this.clearable!==undefined){
            this.is_clear = true;
        }
    },
    methods:{
        ...mapActions(['saveUserInfo']),
        dateFmt(timestamp) {
            const d = new Date(timestamp);
            let month = d.getMonth() + 1;
            month = month < 10 ? '0' + month : month;
            const date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
            return d.getFullYear() + '-' + month + '-' + date;
        },
        //默认当前日期减days天数
        reduceDaysToDate(days){
            if (days === undefined || days === '') {
                days = 0;
            }
            let date = new Date();
            date.setDate(date.getDate() - days);
            return this.dateFmt(date);
        },
        clearT(e){
            this.value = null;
            this.$emit('input',null);
        }
    },
    computed:{
        ...mapGetters(['userInfo']),
    }
}
</script>
<style lang="less">
    //设置默认文本的样式
    .ly-input_inner::-webkit-input-placeholder{color:rgb(204, 207, 209);}
    .ly-textarea__inner::-webkit-input-placeholder{color:rgb(204, 207, 209);}

    .ly-input{
        width: 100%;
        padding:10;
        font-size: 14px;
        position: relative;
        .ly-input_inner{
            display: inline-block;
            height: 40px;
            line-height: 40px;
            box-sizing: border-box;
            font-size: inherit;
            color:#5f5e5e;
            outline: none;
            border-radius: 5px;
            border:1px solid #cecccc;
            padding: 0 10px;
            width:100%;
            transition: border-color .3s cubic-bezier(0.075, 0.82, 0.165, 1);
            &:focus{
                border-color:rgb(56, 169, 245);
            }
        }
        .preicon{
            display: table-cell;
            box-sizing: border-box;
            text-align: center;
            line-height: 38px;
            background-color: #ecebeb;
            // position: absolute;
            height: 38px;
            width: 40px;
            border-radius: 5px;
            vertical-align: center;
            border:1px solid #cecccc;
            border-right: none;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            color: #5f5e5e;
        }
        .clear_wrap{
            display: flex;
            // box-sizing: border-box;
            // line-height: 38px;
            align-items: center;
            position: absolute;
            right: 10px;
            top:1px;
            height: 38px;
            width: 16px;
            vertical-align: center;
            color: #ffffff;
            .clear{
                display: inline-block;
                width: inherit;
                background-color: #a8a8a8;
                border-radius: 50%;
                text-align: center;
                font-size:10px;
                border: 1px solid #a8a8a8;
                cursor: pointer;
                &:hover{
                    background-color: #7a7a7a;
                    border-color: #7a7a7a;
                }
            }
        }
        .suficon{
            display: table-cell;
            box-sizing: border-box;
            text-align: center;
            line-height: 38px;
            background-color: #ecebeb;
            // position: absolute;
            height: 38px;
            width: 40px;
            border-radius: 5px;
            vertical-align: center;
            border:1px solid #cecccc;
            border-left: none;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            color: #5f5e5e;
        }
        .ly-textarea__inner{
            display: block;
            font-family: arria;
            border:1px solid #cecccc;
            border-radius: 5px;
            box-sizing: border-box;
            line-height: 1.5;
            outline: none;
            color:#5f5e5e;
            width: 100%;
            font-size: inherit;
            padding: 10px;
            resize:vertical;
            transition: border-color .3s cubic-bezier(0.075, 0.82, 0.165, 1);
            &:focus{
                border-color:rgb(56, 169, 245);
            }
        }
    }
    .is_preicon{
        display: inline-table;
        .ly-input_inner{
            display: table-cell;
            border-top-left-radius: 0;
            border-bottom-left-radius:0; 
        }
    }
    .is_suficon{
        display: inline-table;
        .ly-input_inner{
            display: table-cell;
            border-top-right-radius: 0;
            border-bottom-right-radius:0; 
        }
    }
    .is_disabled{
        .ly-input_inner{
            background-color: #f5f5f5;
            color: #c0c4cc;
            cursor: not-allowed;
        }
    }
    // .is_clear{
    //     display: inline-table;
    //     .ly-input_inner{
    //         display: table-cell;
    //     }
    // }
</style>


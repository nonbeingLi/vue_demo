import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const SAVE_USER_INFO = 'SAVE_USER_INFO'
const state={
    userInfo:{'a':'sdfd'}
}

const getters={
    userInfo:state => state.userInfo
}

const mutations={
    [SAVE_USER_INFO]:(state,date) =>{
        state.userInfo = date;
    }
}

const actions={
    saveUserInfo({commit},date){
        commit(SAVE_USER_INFO,date)
    }
}

export default new Vuex.Store({state,getters,mutations,actions})
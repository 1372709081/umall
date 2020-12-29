import { reqSeckList } from "../../utils/http";

let state = {
    //列表
    list: []
}
let mutations = {
    changeList(state, arr) {
        state.list = arr;
    }
}
let getters = {
    list(state) {
        return state.list
    }
}
let actions = {
    //获取list的action
    reqList(context) {
        //发请求
        reqSeckList().then(res => {
            if (res.data.code) {
                //修改list
                context.commit("changeList", res.data.list)
            }
        })
    }
}


export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}
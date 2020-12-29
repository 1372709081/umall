import axios from "axios"
import qs from "qs"
import Vue from "vue"
import { erroralert } from "./alert"


let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"

//相应拦截
axios.interceptors.response.use(res => {
    //处理失败
    if (res.data.code !== 200) {
        erroralert(res.data.msg)
    }
    //统一处理list是null的情况
    if (!res.data.list) {
        res.data.list = []
    }
    //掉线处理
    if (res.data.msg === "登录已过期或访问权限受限") {
        //清除用户登录的信息 userInfo
        store.dispatch("changeUser", {})
        //跳到登录页面
        router.push("/login")
    }
    console.group("本次请求地址是：" + res.config.url)
    console.log(res);
    console.groupEnd()
    return res
})

//带有文件的参数转换
function dataToFormData(obj) {
    let data = new FormData()
    for (let i in obj) {
        data.append(i, obj[i])
    }
    return data
}

/* ********************系统设置************************* */

//-------------------菜单管理-------------------
//添加
export const reqMenuAdd = (user) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        params: {
            istree: true
        }
    })
}

//删除
export const reqMenuDel = (obj) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

//编辑一条信息
export const reqMenuDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        params: obj
    })
}

//修改
export const reqMenuEdit = (user) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(user)
    })
}



//-------------------角色管理-------------------
//添加
export const reqRoleAdd = (user) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
    })
}

//删除
export const reqRoleDel = (obj) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

//编辑一条信息
export const reqRoleDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        params: obj
    })
}

//修改
export const reqRoleEdit = (user) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(user)
    })
}



//-------------------管理员管理-------------------
//添加
export const reqUserAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表总数
export const reqUserCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
    })
}

//列表
export const reqUserList = (num) => {
    return axios({
        url: baseUrl + "/api/userlist",
        params: num
    })
}

//删除
export const reqUserDel = (obj) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

//编辑一条信息
export const reqUserDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        params: obj
    })
}

//修改
export const reqUserEdit = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}


/* ********************商城管理************************* */

//-------------------商品分类-------------------
//添加
export const reqCateAdd = (user) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表 {istree:true}  不传为false
export const reqCateList = (user) => {
    return axios({
        url: baseUrl + "/api/catelist",
        params: user
    })
}

//编辑一条信息
export const reqCateDetail = (user) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        params: user
    })
}

//修改
export const reqCateEdit = (user) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除
export const reqCateDel = (user) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(user)
    })
}



//-------------------商品规格-------------------
//添加
export const reqSpecsAdd = (user) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表总数
export const reqSpecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount"
    })
}

//列表
export const reqSpecsList = (user) => {
    return axios({
        url: baseUrl + "/api/specslist",
        params: user
    })
}

//编辑一条信息
export const reqSpecsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        params: user
    })
}

//修改
export const reqSpecsEdit = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除
export const reqSpecsDel = (user) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}



//-------------------商品管理-------------------
//添加
export const reqGoodsAdd = (user) => {
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//总数
export const reqGoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount"
    })
}

//列表
export const reqGoodsList = (user) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        params: user
    })
}

//编辑一条信息
export const reqGoodsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        params: user
    })
}

//修改
export const reqGoodsEdit = (user) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除
export const reqGoodsDel = (user) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}



//-------------------会员管理-------------------
//列表
export const reqMemberList = () => {
    return axios({
        url: baseUrl + "/api/memberlist"
    })
}

//编辑一条信息
export const reqMemberDetail = (user) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        params: user
    })
}

//修改
export const reqMemberEdit = (user) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(user)
    })
}



//-------------------轮播图管理-------------------
//添加
export const reqBannerAdd = (user) => {
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表
export const reqBannerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
    })
}

//编辑一条信息
export const reqBannerDetail = (user) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        params: user
    })
}

//修改
export const reqBannerEdit = (user) => {
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除
export const reqBannerDel = (user) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(user)
    })
}



//-------------------限时秒杀-------------------
//添加
export const reqSeckAdd = (user) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表
export const reqSeckList = () => {
    return axios({
        url: baseUrl + "/api/secklist",
    })
}

//编辑一条信息
export const reqSeckDetail = (user) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        params: user
    })
}

//修改
export const reqSeckEdit = (user) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除
export const reqSeckDel = (user) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify(user)
    })
}
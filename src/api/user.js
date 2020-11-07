// 用户的相关模块
import request from "@/utils/request"

// 加载stort
// import store from "@/store"

export const login = data => {
    return request({
        method: "POST",
        url: "/app/v1_0/authorizations",
        data
    })
}

// 获取登录用户信息
export const getCurrentUser = () => {
    return request({
        method: "GET",
        url: "/app/v1_0/user/profile",
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

// 获取频道列表
export const getUserChannels = () => {
    return request({
        method: "GET",
        url: "/app/v1_0/user/channels",
    })
}
// 请求模块
import axios from 'axios'
import store from "@/store"

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/', //基准路径
})

// 请求拦截器
request.interceptors.request.use(function (config) {
    // config里面是用户请求时所有的数据,不是获取的数据是请求时发送的数据
    // console.log(config)
    const { user } = store.state
    // 如果用户已登录，统一给用户设置token信息
    if(user){
        config.headers.Authorization = `Bearer ${user.token}`
    }

    // 请求完成一定要把config放出去，否则请求就会停在这里发不出去
    return config;
    
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
// 响应拦截器

// 导出
export default request
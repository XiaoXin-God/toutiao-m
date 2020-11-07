// dayjs相关配置
import dayjs from "dayjs"
import Vue from "vue"
// 配置使用中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'


dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

Vue.filter('relativeTime',value =>{
    return dayjs(value).from(dayjs())
})
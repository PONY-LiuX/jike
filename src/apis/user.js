//用户相关所有请求
import { request } from "@/utils";


// 1 登陆请求
//通用写法，而非具体写法 return的是promise函数
export function loginAPI(formData) {
    return request({
        url: '/authorizations',
        method: 'POST',
        data: formData
    })
}
//获取用户信息
export function getProfileAPI() {
    return request({
        url: '/user/profile',
        method: 'GET',
    })
}
//封装和文章相关的接口函数
import { request } from "@/utils"

//1 获取频道的列表
export function getChannelAPI() {
    return request({
        url: '/channels',
        method: 'GET',
    })
}

//提交文章的内容表单
export function createArticleAPI(data) {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}
//更新
export function updateArticleAPI(data) {
    return request({
        url: `mp/articles/${data.id}?draft=false`,
        method: 'PUT',
        data
    })
}


//获取文章列表
export function getArtcleAPI(params) {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}

//删除文章
export function delArticleAPI(id) {
    return request({
        url: `/mp/articles/${id}`,
        method: 'DELETE'
    })
}

//获取文章详情
export function getArticleByIDAPI(id) {
    return request({
        url: `/mp/articles/${id}`
    })
}

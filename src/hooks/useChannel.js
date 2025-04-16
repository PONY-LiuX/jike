//获取频道列表的逻辑
import { useEffect, useState } from "react"
import { getChannelAPI } from "@/apis/article"
function useChannel() {
    //1.获取频道列表所有的逻辑

    //获取频道列表
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        //1 封装函数 函数体内调用接口 声明在内部是因为只想触发一次？
        const getChannelList = async () => {
            const res = await getChannelAPI()
            setChannelList(res.data.channels)
        }
        //2 存入数据
        getChannelList()

    }, [])


    //2.组件需要的数据return出去
    return {
        channelList
    }
}

export { useChannel }
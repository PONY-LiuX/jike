//封装高阶组件
//核心逻辑： 有token正常跳转  无token 去登陆

import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"

//参数是路由组件
export function AuthRoute({ children }) {
    const token = getToken()
    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to={'/login'} replace></Navigate>
    }
}
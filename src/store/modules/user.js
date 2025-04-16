import { createSlice } from "@reduxjs/toolkit";
import { removeToken } from "@/utils";
import { getToken, setToken as _setToken } from "@/utils";
import { loginAPI, getProfileAPI } from "@/apis/user";
const userStore = createSlice({
    name: "user",
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            //数据持久化
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

const { setToken, setUserInfo, clearUserInfo } = userStore.actions
const userReducer = userStore.reducer

//异步方法 完成登陆 获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        //1 发送异步请求
        const res = await loginAPI(loginForm)
        //2 提交同步方法 存入token
        dispatch(setToken(res.data.token))
    }
}

//异步方法 获取用户个人信息
const fetchUserInfo = () => {
    return async (dispatch) => {
        //1 发送异步请求
        const res = await getProfileAPI()
        //2 提交同步方法 存入userInfo
        dispatch(setUserInfo(res.data))

    }
}



export { setToken, clearUserInfo, fetchUserInfo, fetchLogin }



export default userReducer
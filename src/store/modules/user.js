import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { getToken, setToken as _setToken } from "@/utils";
const userStore = createSlice({
    name: "user",
    initialState: {
        token: getToken() || ''
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            //数据持久化
            _setToken(action.payload)
        }
    }
})

const { setToken } = userStore.actions
const userReducer = userStore.reducer

//异步方法 完成登陆 获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        //1 发送异步请求
        const res = await request.post('/authorizations', loginForm)
        //2 提交同步方法 存入token
        dispatch(setToken(res.data.token))
    }
}



export { setToken, fetchLogin }



export default userReducer
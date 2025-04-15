import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";

//导出store实例
export default configureStore({
    reducer: {
        user: userReducer
    }
})
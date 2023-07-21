import { combineReducers } from "redux";
import exampleReducer from "./islogin"
import status from "./status"
import search from "./search"
// Sử dụng combineReducers để gộp các reducer lại
export const reducer = combineReducers({ exampleReducer, status, search })

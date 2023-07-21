import * as typeAction from '../typeaction/typeaction'
import axios from "axios"
const initState = {
  isLogin: null
}

const exampleReducer = (state = initState, action) => {
  switch (action.type) {
    case typeAction.ACT_LOGOUT:
      localStorage.removeItem('isLogin')
      axios.patch(`https://db-nike.onrender.com/users/${action.payload}`, { isLogin: false })
      return { ...state, isLogin: false };
    case typeAction.ACT_LOGIN:
      axios.patch(`https://db-nike.onrender.com/users/${action.payload}`, { isLogin: true })
      return { ...state, isLogin: true };
    default:
      return state;
  }
};

export default exampleReducer;

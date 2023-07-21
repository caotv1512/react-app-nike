import * as typeAction from "../typeaction/typeaction"
export const act_logout = (value) => {
  return {
    type: typeAction.ACT_LOGOUT,
    payload: value
  }
}
export const act_login = (value) => {
  return {
    type: typeAction.ACT_LOGIN,
    payload: value
  }
}

export const act_status = (value) => {
  return {
    type: typeAction.ACT_STATUS,
    payload: value
  }
}

export const act_search = (value) => {
  return {
    type: typeAction.ACT_SEARCH,
    payload: value
  }
}

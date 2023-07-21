import * as typeAction from '../typeaction/typeaction'

const initState = []

const search = (state = initState, action) => {
  switch (action.type) {
    case typeAction.ACT_SEARCH:
      return state = action.payload
    default:
      return state
  }
}

export default search;

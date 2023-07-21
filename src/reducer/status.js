import * as typeAction from '../typeaction/typeaction'

const initState = true

const status = (state = initState, action) => {
  switch (action.type) {
    case typeAction.ACT_STATUS:

      return !state

    default:
      return state
  }
}

export default status;

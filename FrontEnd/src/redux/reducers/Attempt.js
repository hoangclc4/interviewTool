import * as types from "../actions/actionTypes";

let initialState = {};
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ANSWER_RECORD:
      return [...action.data];
    case types.SHOW_USER_ATTEMPT:
      return [...action.data];
    default:
      return state;
  }
};
export default myReducer;

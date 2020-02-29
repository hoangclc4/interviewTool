import * as types from "../actions/actionTypes";

let initialState = {
  isDoneLoading: false,
  showQuizCode: false,
  user: {}
};
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_QUESTION_TABLE:
      if (typeof action.data !== "undefined")
        state = {
          ...state,
          ...action.data,
          isDoneLoading: true,
          user: action.data[0]
        };

      return {
        ...state
      };

    case types.SHOW_ONE_QUESTION_TABLE:
      return {
        ...state,
        questionTable: { ...action.data },
        showQuizCode: true
      };
    case types.UPDATE_USER:
      return {
        ...state,
        user: action.data
      };
    case types.CLOSE_CODE_QUESTION_TABLE:
      return {
        ...state,
        showQuizCode: false
      };
    case types.CHECK_USER_DO_QUIZ:
      state.isPlayedBefore = action.data;
      return { ...state };
    default:
      return state;
  }
};
export default myReducer;

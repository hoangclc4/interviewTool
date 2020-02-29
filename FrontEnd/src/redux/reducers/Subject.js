import * as types from "../actions/actionTypes";
const initialState = {
  subjects: [],
  tablesBySubject: [],
  isDoneLoading: false
};

let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_SUBJECT: {
      state.subjects = [...action.data];
      return { ...state };
    }
    case types.GET_QUESTION_TABLE_BY_SUBJECT: {
      state.tablesBySubject = [...action.data];
      state.isDoneLoading = true;
      return { ...state };
    }
    case types.SHOW_QUESTION_TABLE_BY_SUBJECT: {
      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default myReducer;

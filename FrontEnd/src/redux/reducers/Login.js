import * as types from "../actions/actionTypes";

let initialState = {
  email: "",
  password: "",
  checkLogin: false,
  token: "",
  isLoading: false
};
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      state.email = action.state.email;
      state.password = action.state.password;
      state.checkLogin = true;
      state.token = action.token;
      return {
        ...state
      };
    case types.LOGIN_FAIL:
      return {
        ...state
      };
    case types.SIGN_UP_SUCCESS:
      return {
        ...state
      };
    case types.SIGN_UP_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
};
export default myReducer;

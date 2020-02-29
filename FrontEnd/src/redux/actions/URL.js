const domain = "http://localhost:3000";
export const LOGIN_API_URL = `${domain}/api/get_user`;
export const LOGOUT_API_URL = "https://terralogic-training.web.app/api/logout";
export const SIGN_UP_API_URL =
  "https://terralogic-training.firebaseapp.com/api/sign_up";
export const SHOW_PROFILE_API_URL =
  "https://terralogic-training.firebaseapp.com/api/get_profile";
export const UPDATE_PROFILE_API_URL =
  "https://terralogic-training.firebaseapp.com/api/set_profile";
//
export const QUESTION_API_URL = `${domain}/api/question`;
export const UPDATE_QUESTION_ANSWER_API_URL = `${domain}/api/question_answer_update`;
export const UPDATE_QUESTION_API_URL = `${domain}/api/question_update`;
export const UPDATE_TABLE_API_URL = `${domain}/api/table_update`;
export const UPDATE_TABLE_PLAYED_API_URL = `${domain}/api/table_update_played`;

//question table
export const ANSWER_API_URL = `${domain}/api/questionchoices`;
export const QUESTION_TABLE_API_URL = `${domain}/api/questiontable`;
export const SUBJECT_API_URL = `${domain}/api/subject`;
export const QUESTION_TABLE_BY_SUBJECT_API_URL = `${domain}/api/get_question_table_by_subject`;
export const ANSWER_RECORD_API_URL = `${domain}/api/user_answer`;
export const ATTEMPT_RECORD_API_URL = `${domain}/api/attempt_record`;
export const GENARATE_CODE_API_URL = `${domain}/api/genarate_code`;

//user
export const UPDATE_USER_API = `${domain}/api/update_user`;
export const USER_QUESTION_TABLE_API_URL = `${domain}/api/get_user_question_table`;
export const QUESTION_TABLE_CODE_API_URL = `${domain}/api/get_question_table_code`;
export const USER_ATTEMPT_API_URL = `${domain}/api/quiz_attempt`;
export const CHECK_USER_DO_QUIZ_API_URL = `${domain}/api/is_user_did_table`;
export const GET_COMPLETED_TABLE = `${domain}/api/get_completed_table`;

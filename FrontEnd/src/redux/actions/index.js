import * as types from "./actionTypes";
import * as URLs from "./URL";

import axios from "axios";
import Swal from "sweetalert2";
import history from "./../../history";
export const loginAPI = state => {
  return dispatch => {
    axios({
      method: "post",
      url: URLs.LOGIN_API_URL,
      headers: {
        "content-type": "application/json"
      },
      data: state
    })
      .then(res => {
        console.log("res user", res.data);
        localStorage.setItem("token", res.data.token);
        Swal.fire({
          position: "top",
          type: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
          heightAuto: false
        });
        dispatch({
          type: types.LOGIN_SUCCESS,
          state,
          token: res.data.token
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};

///////////////////////////////////////////////

export const createQuestionAndAnswersAPI = (
  question_table_id,
  question,
  answers
) => {
  return dispatch => {
    const data = {
      ...question,
      question_table_id,
      question_choices: answers
    };
    axios({
      method: "post",
      url: URLs.QUESTION_API_URL,
      headers: {
        "content-type": "application/json"
      },
      data: data
    })
      .then(res => {
        Swal.fire({
          position: "center",
          type: "success",
          title: "Create Successfully",
          showConfirmButton: false,
          timer: 1500,
          heightAuto: false
        });
        console.log("res data", res);
        dispatch({
          type: types.CREATE_QUESTION_ANSWERS,
          data: res.data
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};

export const updateQuestionAndAnswersAPI = (question, answers, index) => {
  return dispatch => {
    const data = {
      ...question,

      question_choices: answers
    };
    axios({
      method: "post",
      url: URLs.UPDATE_QUESTION_ANSWER_API_URL,
      headers: {
        "content-type": "application/json"
      },
      data: data
    })
      .then(res => {
        Swal.fire({
          position: "center",
          type: "success",
          title: "Update Successfully",
          showConfirmButton: false,
          timer: 1500,
          heightAuto: false
        });
        console.log("res Update success", res);
        dispatch({
          type: types.UPDATE_QUESTION_TABLE_QUESTION,
          question,
          question_choices: res.data,
          index
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const updateQuestion = (data, index) => {
  return dispatch => {
    axios({
      method: "post",
      url: URLs.UPDATE_QUESTION_API_URL,
      headers: {
        "content-type": "application/json"
      },
      data: data
    })
      .then(res => {
        Swal.fire({
          position: "center",
          type: "success",
          title: "Update Successfully",
          showConfirmButton: false,
          timer: 1500,
          heightAuto: false
        });
        console.log("res Update success", res);
        dispatch({
          type: types.UPDATE_TIME,
          data,
          index
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const deleteQuestionAndAnswersAPI = (id, index) => {
  return dispatch => {
    axios({
      method: "delete",
      url: URLs.QUESTION_API_URL + `/${id}`,
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        Swal.fire({
          position: "center",
          type: "success",
          title: "Delete Successfully",
          showConfirmButton: false,
          timer: 1500,
          heightAuto: false
        });
        console.log("res delete", res);
        dispatch({
          type: types.SHOW_QUESTION_AFTER_DELETE,
          index
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const showListQuestionAnswer = question_table_id => {
  return dispatch => {
    axios({
      method: "get",
      url: URLs.QUESTION_TABLE_API_URL + `/${question_table_id}`,
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        console.log("res list question", res.data);
        dispatch({
          type: types.SHOW_QUESTION_ANSWERS,
          data: res.data
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const finishQuestionTable = id => {
  return dispatch => {
    axios({
      method: "put",
      url: URLs.UPDATE_TABLE_API_URL,
      headers: {
        "content-type": "application/json"
      },
      data: { id, is_finish: true }
    })
      .then(res => {
        console.log("res Update success", res);
        history.push("/join");
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const updateTableWithPlayed = id => {
  return dispatch => {
    axios({
      method: "put",
      url: URLs.UPDATE_TABLE_PLAYED_API_URL,
      headers: {
        "content-type": "application/json"
      },
      data: { id: id }
    })
      .then(res => {})
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const updateTable = data => {
  return dispatch => {
    axios({
      method: "put",
      url: URLs.UPDATE_TABLE_API_URL,
      headers: {
        "content-type": "application/json"
      },
      data: { ...data }
    })
      .then(res => {
        console.log("res Update question table success", res);
        dispatch({
          type: types.UPDATE_QUESTION_TABLE,
          data: data
        });
        Swal.fire({
          position: "center",
          type: "success",
          title: "Update Successfully",
          showConfirmButton: false,
          timer: 1500,
          heightAuto: false
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const showListSubject = () => {
  return dispatch => {
    axios({
      method: "get",
      url: URLs.SUBJECT_API_URL,
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        console.log("res subject", res.data);
        dispatch({
          type: types.SHOW_SUBJECT,
          data: res.data
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const getListTableBySubject = () => {
  return dispatch => {
    axios({
      method: "post",
      url: URLs.QUESTION_TABLE_BY_SUBJECT_API_URL,
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        console.log("API get QUESTION TABLE by SUBJECT ", res.data);
        dispatch({
          type: types.GET_QUESTION_TABLE_BY_SUBJECT,
          data: res.data
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const showListTableBySubject = () => {
  return {
    type: types.SHOW_QUESTION_TABLE_BY_SUBJECT
  };
};
export const createQuestionTable = data => {
  return dispatch => {
    let token = localStorage.getItem("token");
    axios({
      method: "post",
      url: URLs.QUESTION_TABLE_API_URL,
      headers: {
        "content-type": "application/json",
        "user-token": token
      },
      data: data
    })
      .then(res => {
        console.log("res create table", res.data);
        dispatch({
          type: types.CREATE_QUESTION_TABLE,
          data: res.data
        });
        history.push(`/quiz/${res.data.id}`);
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const addAnswerRecord = data => {
  return dispatch => {
    let token = localStorage.getItem("token");
    axios({
      method: "post",
      url: URLs.ANSWER_RECORD_API_URL,
      headers: {
        "content-type": "application/json",
        "user-token": token
      },
      data: data
    })
      .then(res => {
        console.log(res);
        localStorage.setItem("attempt_id", res.data.id);
        history.push(`/join/pre-game/${res.data.question_table_id}/review`);
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};

//////////////// Activity
export const getListQuestionTable = () => {
  return dispatch => {
    let token = localStorage.getItem("token");
    axios({
      method: "post",
      url: URLs.USER_QUESTION_TABLE_API_URL,
      headers: {
        "content-type": "application/json",
        "user-token": token
      }
    })
      .then(res => {
        console.log("API show QUESTION TABLE", res.data);
        dispatch({
          type: types.SHOW_QUESTION_TABLE,
          data: res.data
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const updateUser = data => {
  return dispatch => {
    let token = localStorage.getItem("token");
    axios({
      method: "put",
      url: URLs.UPDATE_USER_API,
      headers: {
        "content-type": "application/json",
        "user-token": token
      },
      data: data
    })
      .then(res => {
        console.log("API UPDATE_USER ", res.data);
        dispatch({
          type: types.UPDATE_USER,
          data: res.data
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const getListUserDoQuestionTable = () => {
  return dispatch => {
    let token = localStorage.getItem("token");
    axios({
      method: "post",
      url: URLs.GET_COMPLETED_TABLE,
      headers: {
        "content-type": "application/json",
        "user-token": token
      }
    })
      .then(res => {
        console.log("API show user do QUESTION TABLE ", res.data);
        dispatch({
          type: types.GET_QUESTION_TABLE_COMPLETED,
          data: res.data
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const showListUserDoQuestionTable = () => {
  return {
    type: types.SHOW_QUESTION_TABLE_COMPLETED
  };
};
export const showListQuestionTable = () => {
  return {
    type: types.SHOW_QUESTION_TABLE
  };
};
export const getQuestionTableByCode = code => {
  return dispatch => {
    axios({
      method: "post",
      url: URLs.QUESTION_TABLE_CODE_API_URL,
      headers: {
        "content-type": "application/json"
      },
      data: {
        code
      }
    })
      .then(res => {
        console.log("API show QUESTION TABLE by CODE", res.data);
        if (res.data !== "")
          dispatch({
            type: types.SHOW_ONE_QUESTION_TABLE,
            data: res.data
          });
        else
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Your code is not right!"
          });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const closeQuestionTableByCode = () => {
  return { type: types.CLOSE_CODE_QUESTION_TABLE };
};
export const generateCode = id => {
  return dispatch => {
    axios({
      method: "post",
      url: URLs.GENARATE_CODE_API_URL,
      headers: {
        "content-type": "application/json"
      },
      data: { id }
    })
      .then(res => {
        console.log("API sho CODE", res.data);

        dispatch({
          type: types.SHOW_QUESTION_ANSWERS,
          data: res.data
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const isUserDoQuizBefore = question_table_id => {
  return dispatch => {
    let token = localStorage.getItem("token");
    axios({
      method: "post",
      url: URLs.CHECK_USER_DO_QUIZ_API_URL,
      headers: {
        "content-type": "application/json",
        "user-token": token
      },
      data: { question_table_id }
    })
      .then(res => {
        console.log("API show QUESTION TABLE", res.data);
        dispatch({
          type: types.CHECK_USER_DO_QUIZ,
          data: res.data
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
// Pre-Game
export const getListUserAttempt = question_table_id => {
  return dispatch => {
    let token = localStorage.getItem("token");
    axios({
      method: "post",
      url: URLs.USER_ATTEMPT_API_URL,
      headers: {
        "content-type": "application/json",
        "user-token": token
      },
      data: { question_table_id }
    })
      .then(res => {
        console.log("API show List User Attempt", res.data);
        dispatch({
          type: types.SHOW_USER_ATTEMPT,
          data: res.data
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
export const getAttempt = (question_table_id, attempt_id) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    axios({
      method: "post",
      url: URLs.ATTEMPT_RECORD_API_URL,
      headers: {
        "content-type": "application/json",
        "user-token": token
      },
      data: { question_table_id, attempt_id }
    })
      .then(res => {
        console.log("API show Attemp record", res.data);
        dispatch({
          type: types.SHOW_ANSWER_RECORD,
          data: res.data
        });
      })
      .catch(er => {
        console.log("er", er);
      });
  };
};
//

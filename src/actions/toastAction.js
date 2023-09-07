import { TOAST_HIDDEN, TOAST_SHOW } from "../constants/toastConstant";

export const showToast = (title,done) => async (dispatch) => {
    try {

      dispatch({ type: TOAST_SHOW,payload:title });
  

      setTimeout(()=>{
        dispatch({type:TOAST_HIDDEN,payload:null})
      },2000)
  


    } catch (error) {
        console.log(error)
    //   dispatch({
    //     type: USER_LOGIN_FAIL,
    //     payload:
    //       error.response && error.response.data.message
    //         ? error.response.data.message
    //         : error.message,
    //   });
    }
  };
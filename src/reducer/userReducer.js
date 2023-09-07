import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGOUT,USER_LOGOUT_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_NULL} from '../constants/userConstant'

export const userLoginReducer = (state={},action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true}
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return {loading:false, error: action.payload}
        case USER_LOGOUT:
            return {};
        default:
            return state
    }
}

export const userRegister =(state={},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true}
        case USER_REGISTER_SUCCESS:
            return {loading:false,userInfo:action.payload}
        case USER_REGISTER_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}
export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true };
      case USER_UPDATE_SUCCESS:
        return { loading: false, userInfo: action.payload ,success:true};
      case USER_UPDATE_NULL:
        return {success:false};
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload};
      default:
        return state;
    }
  };



export const logoutReducer = ()=> async(action)=>{
  
        if (action.type === USER_LOGOUT) {
          return { userlogout: true };
        }else if(action.type === USER_LOGOUT_FAIL){
           return { userlogout: false ,errorLogout:action.payload};
        }
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
  };



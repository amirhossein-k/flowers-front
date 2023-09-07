import { TOAST_HIDDEN, TOAST_SHOW } from "../constants/toastConstant"

export const toastReducer = (state={},action)=>{
    switch(action.type){
        // case USER_LOGIN_REQUEST:
        //     return {loading:true}
        case TOAST_SHOW:
            return { toast: action.payload}
        case TOAST_HIDDEN:
            return { toast: action.payload}
        // case USER_LOGOUT:
        //     return {};
        default:
            return state
    }
}
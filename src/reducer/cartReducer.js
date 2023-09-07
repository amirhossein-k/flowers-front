import { ADD_CART_FAIL, ADD_CART_LIST_FAIL, ADD_CART_LIST_REQUEST, ADD_CART_LIST_SUCCESS, ADD_CART_NULL, ADD_CART_REQUEST, ADD_CART_SUCCESS } from "../constants/cartConstant";



export const addCart = (state={},action)=>{
    switch(action.type){
        case ADD_CART_REQUEST:
            return {loading: true}
        case ADD_CART_SUCCESS:
            return { loading:false, Cart: action.payload,message:'اضافه شد'}
        case ADD_CART_FAIL:
            return { loading:false, error:action.payload}
        case ADD_CART_NULL:
            return { loading:false, Cart:null}
        default:
            return state
    }
}
export const listCart = (state={},action)=>{
    switch(action.type){
        case ADD_CART_LIST_REQUEST:
            return {loading: true}
        case ADD_CART_LIST_SUCCESS:
            return { loading:false, cartlist: action.payload}
        case ADD_CART_LIST_FAIL:
            return { loading:false, error:action.payload}
      
        default:
            return state
    }
}

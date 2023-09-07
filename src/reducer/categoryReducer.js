import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_PRODUCT_LIST_REQUEST,
  CATEGORY_PRODUCT_LIST_SUCCESS,
  CATEGORY_PRODUCT_LIST_FAIL
} from "../constants/categoryConstant";


export const categoryListReducer = (state={},action)=>{
    switch(action.type){
        case CATEGORY_LIST_REQUEST:
            return {loading: true}
        case CATEGORY_LIST_SUCCESS:
            return { loading:false, category: action.payload[0]}
        case CATEGORY_LIST_FAIL:
            return { loading:false, error:action.payload}
        default:
            return state
    }
}

export const categoryListProductReducer = (state={},action)=>{
    switch(action.type){
        case CATEGORY_PRODUCT_LIST_REQUEST:
            return {loading: true}
        case CATEGORY_PRODUCT_LIST_SUCCESS:
            return { loading:false, category_product: action.payload[0]}
        case CATEGORY_PRODUCT_LIST_FAIL:
            return { loading:false, error:action.payload}
        default:
            return state
    }
}
import { type } from "@testing-library/user-event/dist/type";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
} from "../constants/productConstant";

export const productListReducder = (state={product: []},action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true}
        case PRODUCT_LIST_SUCCESS:
            return { loading:false,product:action.payload}
        case PRODUCT_LIST_FAIL:
            return { loading:false,error:action.payload}
        default:
            return state
    }
}

export const  productCreateReducer = (state={},action)=>{
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return {loading:true}
        case PRODUCT_CREATE_SUCCESS:
            return {loading:false,success:true,newproduct: action.payload}
        case PRODUCT_CREATE_FAIL:
            return {loading:false,error:action.payload,success:false}
        default:
            return state
    }
}

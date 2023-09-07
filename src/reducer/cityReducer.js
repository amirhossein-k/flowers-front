import { CITY_LIST_REQUEST, CITY_LIST_SUCCESS } from "../constants/cityConstant";



export const cityListReducer = (state={},action)=>{
    switch(action.type){
        case CITY_LIST_REQUEST:
            return {loading:true}
        case CITY_LIST_SUCCESS:
            return { loading:false,cityList:action.payload}
        case CITY_LIST_SUCCESS:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}



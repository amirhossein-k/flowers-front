import axios from "axios";
import {
  CITY_LIST_FAIL,
  CITY_LIST_REQUEST,
  CITY_LIST_SUCCESS,
} from "../constants/cityConstant";

export const listCityAction = () => async (dispatch) => {
  try {
    dispatch({type: CITY_LIST_REQUEST});

    const {data} = await axios.get(
      "https://flower-backend.vercel.app/api/city"
    );

    if (data) {
      dispatch({type: CITY_LIST_SUCCESS, payload: data.cityList[0]});
    }
  } catch (error) {
    dispatch({
      type: CITY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

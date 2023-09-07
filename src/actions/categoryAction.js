import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_PRODUCT_LIST_REQUEST,
  CATEGORY_PRODUCT_LIST_SUCCESS,
  CATEGORY_PRODUCT_LIST_FAIL,
} from "../constants/categoryConstant";

import axios from "axios";

export const listCategory = () => async (dispatch, getState) => {
  try {
    dispatch({type: CATEGORY_LIST_REQUEST});

    const {data} = await axios.get(
      "https://flower-backend.vercel.app/api/category/"
    );

    dispatch({type: CATEGORY_LIST_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductCategory = () => async (dispatch, getState) => {
  try {
    dispatch({type: CATEGORY_PRODUCT_LIST_REQUEST});

    const {data} = await axios.get(
      "https://flower-backend.vercel.app/api/category/categoryproduct"
    );

    dispatch({type: CATEGORY_PRODUCT_LIST_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: CATEGORY_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

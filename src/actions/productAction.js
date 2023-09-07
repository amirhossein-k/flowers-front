import axios from "axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_getTarget_REQUEST,
  PRODUCT_getTarget_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstant";

export const listProduct = () => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_LIST_REQUEST});

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const {data} = await axios.get(
      "https://flower-backend.vercel.app/api/product/list",
      config
    );

    dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct =
  (title, pic, detail, price, count, describrtion, category_product, color) =>
  async (dispatch, getState) => {
    try {
      dispatch({type: PRODUCT_CREATE_REQUEST});

      const {
        userLogin: {userInfo},
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const {data} = await axios.post(
        "https://flower-backend.vercel.app/api/product/newproduct",
        {
          title,
          pic,
          detail,
          price,
          count,
          describrtion,
          category_product,
          color,
        },
        config
      );

      dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data});
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getTargetProductAction = () => async (dispatch, getState) => {
  try {
    dispatch({type: PRODUCT_getTarget_REQUEST});

    const {
      listCart: {cartlist},
    } = getState();

    const {data} = await axios.get("");

    dispatch({type: PRODUCT_getTarget_SUCCESS});
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

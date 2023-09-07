import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./price.css";
import pony from "../../../pony.jpg";
import {json, Link, useParams} from "react-router-dom";
import {addCart, listCart} from "../../../actions/cartAction";
import {useDispatch, useSelector} from "react-redux";
import {productContext} from "../../../App";
import {createRef} from "react";
import {memo} from "react";
import numberFormat from "number-formatierer";
import {updateBasketUser} from "../../../actions/userAction";

const Price = ({targetProduct}) => {
  const inputRef = createRef();
  const nameUrl = window.location.href;
  const [order, setOrder] = useState(0);
  const [total_Price, setTotal_Price] = useState(0);
  const [orderCart, setOrderCart] = useState([]);

  const {productId} = useParams();
  const inputvalueRefvalue = useRef([]);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {error, loading: loadingUser, userInfo} = userLogin;

  const cartList = useSelector((state) => state.listCart);
  const {cartlist} = cartList;

  const cartt = useSelector((state) => state.cart);
  const {loading, cart: cartMessage, error: errorCart} = cartt;

  const [productCon, setProductCon] = useContext(productContext);

  const [productListTarget, setProductListTarget] = useState([]);
  const [productCartId, setProductCartId] = useState();
  const [succ, setSucc] = useState(false);

  var newOrder = [];

  // useEffect(()=>{

  //   console.log(cartlist,'cartlist')
  //   if(cartlist){
  //     console.log(cartlist,'product')

  //       cartlist.map(item=> {
  //         const cart ={"order":item.order}
  //         newOrder.push(cart)
  //       })
  //       setOrderCart(newOrder)
  //       const target=cartlist.product

  //       setProductListTarget(target)

  //   }
  // },[cartList])
  // console.log(productListTarget,'productListTarget')
  //   useEffect(()=>{

  //       if(productListTarget?.length >0 ){

  //         var total = 0
  //           for(let i =0; i<cartlist.length ; i++){
  //             console.log(cartlist[i].order,'cartlist[i].order')
  //             total += cartlist[i].order * productListTarget[i].price
  //           }
  //           const format =numberFormat(total)
  //           setTotal_Price(format)

  //       }

  //   },[productListTarget,productCon])

  //  cart list/////////////////////////
  useEffect(() => {
    if (order < 0) {
      setOrder(0);
      console.log("0");
    }
  }, [order, succ, orderCart]);

  const Addhandler = (e) => {
    var cart = {};
    if (nameUrl === "https://flower-backend.vercel.app/cart") {
      console.log(e.target.id, "if url");
      const targetProduct = userInfo.basket.filter(
        (item) => item.product._id === e.target.id
      );
      //  userInfo.basket.filter(item=> console.log(item,'item'))
      const order = orderCart.filter((item) => item.id === e.target.id);
      cart = {product: targetProduct[0].product, order: order[0].order};
      console.log(cart, "cart");
    } else {
      cart = {product: targetProduct, order: order};
      console.log(cart, "cart sin");
    }
    dispatch(addCart(targetProduct, order));
    dispatch(updateBasketUser(cart));
    console.log(order, "order add click handler");
    console.log(targetProduct, "targetProduct  click handler");
  };

  useEffect(() => {
    console.log(userInfo, "user");
    setProductListTarget(userInfo.basket);
    if (productListTarget.length !== 0) {
      console.log(productListTarget, "productListTarget");
      console.log(userInfo, "userInfo");

      userInfo.basket.map((item) => {
        const cart = {order: item.order};
        newOrder.push(cart);
      });

      setOrderCart(newOrder);
    }
  }, [loadingUser, userInfo]);
  console.log(productListTarget, "productListTarget");
  const reduceHandler = useCallback(
    (e, index) => {
      console.log(order, "order");

      setOrderCart((prev) => {
        return prev.map((itemm, indexx) => {
          if (indexx === index) {
            return {order: itemm.order - 1, id: e.target.id};
          } else {
            return {...itemm};
          }
        });
      });
      console.log(orderCart, "order reduce");
    },
    [orderCart, order]
  );
  // ///////////////////////////////////////end cart list
  useEffect(() => {
    // const cartorder =[]
    console.log("loading");
    dispatch(listCart());
    //  window.location.reload()
  }, [loading]);

  const handleDelete = (e) => {};

  const addHandert = useCallback(
    (e, index) => {
      console.log(order, "order");

      setOrderCart((prev) => {
        return prev.map((itemm, indexx) => {
          if (indexx === index) {
            return {order: itemm.order + 1, id: e.target.id};
          } else {
            return {...itemm};
          }
        });
      });
      console.log(orderCart, "order add");
    },
    [orderCart, order]
  );

  return (
    <>
      {nameUrl === `https://flower-backend.vercel.app/product/${productId}` ? (
        <div className="price-container row" dir="rtl">
          <div className="col-12">
            <p>
              {targetProduct?.price} <span>تومان</span>
            </p>
          </div>
          <div className="col-12">
            {" "}
            {targetProduct?.count !== "0" ? (
              <p>موجود در انبار</p>
            ) : (
              <p style={{color: "red"}}>ناموجود در انبار</p>
            )}{" "}
          </div>
          <div className="col-12">
            <div className="add-countianer">
              <span className="title-add" onClick={(e) => Addhandler(e)}>
                افزودن به سبد خرید{" "}
              </span>

              <div className="box-add">
                <div className="inc">
                  <i
                    className="bi bi-plus"
                    onClick={(e) => setOrder(order + 1)}
                  ></i>
                </div>
                <div className="input">
                  <input type="text" required defaultValue={0} value={order} />
                </div>

                <div className="inc">
                  <i
                    className="bi bi-dash"
                    onClick={(e) => setOrder(order - 1)}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="price-container row" dir="rtl">
          {/* list cart */}
          <div className="col-12 col-md">
            <div className="row  g_5">
              {/* 1 item */}

              {cartlist &&
                cartlist.length > 0 &&
                productListTarget?.map((item, index) => {
                  return (
                    <div className="col-12">
                      <div className="row border_cart g-lg-1">
                        {/* delete */}
                        <div className=" col-12 col-xxl-1  col-lg-1 d-flex justify-content-center align-items-center">
                          <i
                            className="bi bi-x-circle d-flex justify-content-center hover_delete_cart"
                            style={{fontSize: 36, padding: "6px 0"}}
                            onClick={(e) => handleDelete(e)}
                            id={item._id}
                          ></i>
                        </div>
                        {/* img */}

                        <div className="col-12 col-xxl-2 col-xl-2 col-lg-2 col-md-11  ">
                          <div className="box-img">
                            <img src={item.product.pic[0]} />
                          </div>
                        </div>
                        {/* title */}
                        <div className="col-12 col-xl-2 col-lg-2 col-xs-3">
                          {/* <div className='row h-100'> */}

                          <div className="title_cart ">
                            <p>{item.title}</p>
                          </div>

                          {/* </div> */}
                        </div>
                        <div className="col-12 col-xl-1 col-lg-1">
                          <div className="row h-100">
                            <div className="col-12 color_title_cart">color</div>
                            <div className="col-12 container_color_cart">
                              <div className="row h-100">
                                {item.color?.map((color) => {
                                  return (
                                    <div className="col-12 d-flex justify-content-center">
                                      {color}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* detail price & staus count */}
                        <div className="col-12 col-xl-3 col-lg-4 col-md-12 ">
                          <div className="row">
                            <div className="col-12">
                              <p>
                                {numberFormat(item.product.price)}{" "}
                                <span>تومان</span>
                              </p>
                            </div>
                            <div className="col-12">
                              {" "}
                              <p>موجود در انبار</p>{" "}
                            </div>

                            <div className="col-12">
                              <div className="add-countianer w-100 row">
                                <div className="col-6 col-xxl-7 col-xl-9 col-lg-7 col-md-4 col-sm-5">
                                  <span
                                    className="title-add "
                                    onClick={(e) => Addhandler(e)}
                                    ref={inputRef}
                                    id={item.product._id}
                                  >
                                    افزودن به سبد خرید{" "}
                                  </span>
                                </div>

                                <div className="col-6 col-xxl-7 col-xl-9 col-lg-7 col-md-4 col-sm-5">
                                  <div className="box-add ">
                                    <div className="inc">
                                      {/* <i className="bi bi-plus" onClick={e=>{
                                  console.log(order,'order')
                                  
                                  setOrderCart(prev=>{
                                    return prev.map((itemm,indexx)=>{
                                      if(indexx === index){
                                        return {"order":itemm.order + 1,"id":e.target.id}
                                      }else{
                                        return {...itemm}
                                      }
                                    })
                                  })
                                  console.log(orderCart,'order 2')

                                } } id={item._id}></i> */}
                                      <i
                                        className="bi bi-plus"
                                        onClick={(e) => addHandert(e, index)}
                                        id={item.product._id}
                                      ></i>
                                    </div>
                                    <div className="input">
                                      <input
                                        type="text"
                                        required
                                        className="add_cart"
                                        value={orderCart[index].order}
                                        id={item.product._id}
                                      />
                                    </div>

                                    <div className="inc">
                                      <i
                                        className="bi bi-dash"
                                        onClick={(e) => reduceHandler(e, index)}
                                        id={item.product._id}
                                      ></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* total peice  */}
                        <div className="col-12 col-xl-2 col-lg col-md-12">
                          <div className="row h-100">
                            <div className="col-12 d-flex justify-content-center">
                              {" "}
                              جمع کل{" "}
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                              {numberFormat(
                                cartlist[index]?.order * item.price
                              )}
                              {/* {(()=>{
                            // setTotal_Price(prev=> prev + cartlist[index]?.order * item.price)
                            // console.log(total_Price,'total')
                          })()} */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {/* item 2 */}
            </div>
          </div>
          {/* price total */}
          <div className="col-12 col-lg-3    my-flex">
            <div className="row">
              <div className="col-12">
                <div className="offer-code w-100">
                  <div className="box">
                    <input placeholder="کد" />
                    <span>اعمال کد تخفیف</span>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="total-container w-100">
                  <span className="title">مجموع کل سبد خرید</span>

                  <div className="box-total-price">
                    <div className="box-price">
                      <span>قیمت کل </span>
                      <span>{total_Price} تومان</span>
                    </div>

                    <div className="box-price">
                      <span> پرداختی شما </span>
                      <span>{total_Price} تومان</span>
                    </div>
                  </div>

                  <div className="button_cart" style={{padding: "3px 0"}}>
                    <Link to={"/checkout"} style={{color: "#fff"}}>
                      ثبت سفارش
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Price);

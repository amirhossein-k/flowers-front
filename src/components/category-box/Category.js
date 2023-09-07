import React, {useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import "./category.css";
import pony from "../../pony.jpg";
import {useDispatch, useSelector} from "react-redux";
import {listCategory} from "../../actions/categoryAction";
import {memo} from "react";
import {productContext} from "../../App";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
const categorynew = [
  {src: pony, titlecategory: "سبد", price: 100},
  {src: pony, titlecategory: "سبد", price: 100},
  {src: pony, titlecategory: "سبد", price: 100},
  {src: pony, titlecategory: "سبد", price: 100},
];
const magazine = [
  {
    src: pony,
    titlecategory: "سبد",
    paraph:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    src: pony,
    titlecategory: "سبد",
    paraph:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    src: pony,
    titlecategory: "سبد",
    paraph:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    src: pony,
    titlecategory: "سبد",
    paraph:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    src: pony,
    titlecategory: "سبد",
    paraph:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];
const Category = () => {
  const [productCon, setProductCon] = useContext(productContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // get list category
  const categoryList = useSelector((state) => state.categoryList);
  const {loading, error, category} = categoryList;
  // get list product
  // const productList = useSelector(state=>state.productList)
  // const {loadingProduct,errorProduct,product} = productList

  // useEffect(()=>{

  // },[category,product])
  // window.onresize  = function () {
  //     if(window.innerWidth<678){
  //         const row = document.querySelector('.category-container')
  //         row.style.maxWidth='100%'
  //     }else if(window.innerWidth>1050){
  //         const row = document.querySelector('.category-container')

  //         row.style.maxWidth='39%'
  //     }else {
  //         const row = document.querySelector('.category-container')

  //         row.style.maxWidth='50%'
  //     }

  //   };

  return (
    <div className="category-container row">
      {/*  */}
      <div className="row list-gat-box">
        {category &&
          category.category.map((i, index) => {
            return (
              <Col sm={4} lg={2} key={index}>
                <div className="box">
                  <img src={i.pic} />
                  <span className="title_category">{i.title}</span>
                </div>
              </Col>
            );
          })}
      </div>
      {/*  */}
      <div className="row new-pro-box">
        <p className="title">جدیدترین محصولات</p>
        {productCon &&
          productCon
            ?.slice(productCon.length - 4, productCon.length)
            .map((item, index) => {
              return (
                <Col
                  sm={3}
                  key={index}
                  onClick={(e) => navigate(`/product/${item._id}`)}
                >
                  <a>
                    <div className="box">
                      <div className="img-box">
                        <img src={item.pic[0]} />
                      </div>
                      <div className="body">
                        <span>{item.title}</span>
                        <span>{item.price}</span>
                      </div>
                    </div>
                  </a>
                </Col>
              );
            })}
      </div>
      {/*  */}
      <p className="title_mag">مجلات</p>
      <div className="outer-wrapper row">
        <div
          className="inner-wrapper row-cols-1"
          style={{margin: "0px !important"}}
        >
          {/* <p className='title'>مجلات</p> */}
          {/* {magazine.map((item,index)=>{
               return(
                <a className="pseudo-item col-sm-6 col-lg-3 col-12 " dir="rtl">
                <div className="box_img">
                   <div className='box'> 
                   <img src={pony}/>
                   </div>
                </div>
                <div className="body">
                    <div className="title">پالونیا</div>
                    <div className="cal">تاذیخ</div>
                    <div className="para">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                         Necessitatibus, ipsam beatae.
                         <a>بیشتر...</a>
                    </div>
                </div>
            </a>
               )
            })} */}
        </div>
      </div>
    </div>
  );
};

export default memo(Category);

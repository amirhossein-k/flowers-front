import React, {
  memo,
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from "react";

import {Container} from "react-bootstrap";
import {Col, Row, Button, Form, FormControl} from "react-bootstrap";
import Navbarr from "../../../components/navbar/Navbarr";
import Sidebar from "../../../components/sidebar/Sidebar";
import styles from "./newproduct.module.scss";
import ReactMarkdown from "react-markdown";
import {go} from "../../../hooks/textaria";
import {useMemo} from "react";
import {TagsInput} from "react-tag-input-component";
// /////
import {createProduct} from "../../../actions/productAction";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import num2persian from "num2persian";
import ListSelector from "../../../components/list_selector/ListSelector";

const Newproduct = () => {
  const dispatch = useDispatch();
  // // // //
  const filesProduct_input = useRef(null);
  const discribeLive_input = useRef(null);

  const [nameProduct, setNameProduct] = useState("");
  const [price, setPrice] = useState(""); //string
  const [count, setCount] = useState(""); // string
  const [detail, setDetail] = useState([]); // array
  const [length_Product, setLength_Product] = useState(""); // string
  const [width_Product, setWidth_Product] = useState(""); // string
  const [height_Product, setHeight_Product] = useState(""); // string
  const [color, setColor] = useState([]); // string
  // const [extra,setExtra]  = useState('');  /// {string}
  const [describrtion, setDescribtion] = useState(""); // [{}]
  // const [done,setDone]  = useState(false);
  const [describtionLive, setDescribtionLive] = useState([]);
  const [product_img, setProduct_img] = useState([]);
  const [loade, setLoade] = useState(false);
  const [title, setTitle] = useState("pic product");
  const [files, setFiles] = useState([]);
  const [keysliderproduct, setKeysliderproduct] = useState([]);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorPic, setErrorPic] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);
  const [categoryProduct, setCategoryProduct] = useState([]);

  // for live textarai////////////////
  // useEffect(()=>{},[price])
  // console.log(files,'files')
  // console.log(typeof files,'filess type')

  const h = () => {
    if (describrtion.length === 0) {
      // console.log('nist')
    } else {
      const promise = go(describrtion);
      promise.then((result) => setDescribtionLive(result));
      // console.log(describtionLive,'extral')
    }
  };
  const log = useMemo(() => h(), [describrtion]);
  // ////// price to farrsi

  const farsiPrice = () => {
    if (price === "") return null;
    return price.num2persian();
  };
  const presian_price_live = useMemo(() => farsiPrice(), [price]);
  // //////////////////////////
  const picproduct = async (e) => {
    e.preventDefault();

    setLoade(true);

    const formData = new FormData();

    Object.values(files).forEach((file) => {
      formData.append("files", file);
    });
    formData.append("title", title);

    try {
      const config = {
        header: {
          "content-type": "multipart/form-data",
        },
      };
      const {data} = await axios.post(
        "https://flower-backend.vercel.app/api/uploade/multiple",
        formData,
        config
      );

      data.file.map((item) => {
        setProduct_img((oldpic) => [...oldpic, `${item.filePath.toString()}`]);
        setKeysliderproduct((oldkey) => [
          ...oldkey,
          `${item.fileKey.toString()}`,
        ]);
      });

      setLoade(false);
    } catch (error) {
      console.log(error);
    }
  };

  //
  const detailHandler = (e) => {
    if (e.target.id === "Height") setHeight_Product(e.target.value);
    if (e.target.id === "Length") setLength_Product(e.target.value);
    if (e.target.id === "Width") setWidth_Product(e.target.value);
  };
  useEffect(() => {
    setDetail([
      {width: width_Product, height: height_Product, length: length_Product},
    ]);
  }, [length_Product, width_Product, height_Product]);
  //
  const resetHandler = () => {
    setHeight_Product("");
    setLength_Product("");
    setWidth_Product("");
    setNameProduct("");
    setCount("");
    setPrice("");
    setDescribtionLive(null);
    setDescribtion("");
    setColor((prevcolor) => prevcolor.splice(0, prevcolor.length));
    setDetail((prevdetail) => prevdetail.splice(0, prevdetail.length));
    // setFiles("")
    // setFiles((prevfile) => prevfile.splice(0, prevfile.length));
    setKeysliderproduct((oldkey) => oldkey.splice(0, oldkey.length));

    filesProduct_input.current.value = null;
    setProduct_img((prevpic) => prevpic.splice(0, prevpic.length));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!nameProduct) setErrorTitle(true);
    else setErrorTitle(false);

    if (!price) setErrorPrice(true);
    else setErrorPrice(false);
    if (
      product_img === undefined ||
      product_img === null ||
      product_img === ""
    ) {
      setErrorPic(true);
    } else {
      dispatch(
        createProduct(
          nameProduct,
          product_img,
          detail,
          price,
          count,
          describtionLive,
          categoryProduct,
          color
        )
      );
      resetHandler();
    }
  };

  return (
    <Container
      fluid
      style={{
        margin: "0 !important",
        padding: "0 !important",
        minHeight: "100vh",
        height: " 100%",
      }}
    >
      <header>
        <Navbarr />
      </header>
      {/* main */}
      <div className={`row ${styles.main}`} style={{"--bs-gutter-x": "0rem"}}>
        {/* slidebar */}
        <div
          className={`col-md-2 col-lg-2 col-xs-12 g-0 flex-basis-0 ${styles.container_sidebar} ${styles.col_lg_2}`}
        >
          <Sidebar />
        </div>

        {/*content  */}
        <div className={`col ${styles.content}`}>
          <div
            className={`row ${styles.container_content}`}
            style={{"--bs-gutter-x": "0rem"}}
          >
            <div className={`col ${styles.newContainer}`}>
              <div className={`${styles.top}`}>
                <h1>اضافه کردن محصول </h1>
              </div>
              {/* pic show */}

              {/* form pic */}

              {/* pic */}
              <Form className={styles.formfix} onSubmit={picproduct} dir="rtl">
                <Row className={styles.formPic}>
                  <Col xs={12}>
                    <div className={styles.form_0}>
                      <Form.Group controlId="picproduct">
                        <Form.Label className={styles.form_label}>
                          تصاویر محصولات
                        </Form.Label>
                        <Form.Control
                          type="file"
                          name="files"
                          onChange={(e) => setFiles(e.target.files)}
                          className={` ${
                            loade === true ? "disabled" : "block-detail"
                          }`}
                          ref={filesProduct_input}
                          multiple
                          accept=".jpeg , .png , .jpg"
                        />
                      </Form.Group>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      type="submit"
                      variant="primary"
                      className={`${
                        loade === true ? "disabled" : "create-new"
                      }`}
                    >
                      آپلود عکس ها
                    </Button>
                  </Col>
                </Row>
                {/* <div className="button-new">
                           
                        </div> */}
              </Form>
              {/* detail product */}
              <Form
                className={styles.formfix}
                onSubmit={submitHandler}
                dir="rtl"
              >
                <div className={styles.form_1}>
                  <Form.Group controlId="titleproduct" style={{width: "100%"}}>
                    <Form.Label>نام محصول</Form.Label>
                    <Form.Control
                      type="text"
                      value={nameProduct}
                      placeholder="نام محصول"
                      onChange={(e) => setNameProduct(e.target.value)}
                      isInvalid={errorTitle}
                    />
                  </Form.Group>
                  <Form.Group controlId="price" style={{width: "100%"}}>
                    <Form.Label>قیمت</Form.Label>
                    <Form.Control
                      type="text"
                      value={price}
                      placeholder="قیمت"
                      onChange={(e) => setPrice(e.target.value)}
                      isInvalid={errorPrice}
                    />
                    <span className={styles.farsi}>{presian_price_live}</span>
                  </Form.Group>
                  <Form.Group controlId="count" style={{width: "100%"}}>
                    <Form.Label>تعداد</Form.Label>
                    <Form.Control
                      type="text"
                      value={count}
                      placeholder="تعداد"
                      onChange={(e) => setCount(e.target.value)}
                    />
                  </Form.Group>
                </div>
                {/* category */}
                <div className={`${styles.form_category} ${styles.form_1}`}>
                  <Form.Label>مجموعه :</Form.Label>
                  <ListSelector setCategoryProduct={setCategoryProduct} />
                </div>
                {/* color */}
                <div className={`${styles.form_2} ${styles.color}`}>
                  <Form.Label>رنگ گل</Form.Label>
                  <TagsInput
                    value={color}
                    onChange={setColor}
                    // name="skills"
                    placeHolder="ویژگی"
                  />
                </div>
                {/* from2 -detail=>size */}
                <h3 className={styles.title} dir="rtl">
                  ویژگی محصول
                </h3>
                <span className={styles.subtitle} dir="rtl">
                  سایز
                </span>
                <div className={styles.form_2}>
                  <Form.Group controlId="Length" style={{width: "100%"}}>
                    <Form.Label> طول</Form.Label>
                    <Form.Control
                      type="text"
                      value={length_Product}
                      placeholder="طول"
                      onChange={(e) => detailHandler(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId="Width" style={{width: "100%"}}>
                    <Form.Label>عرض</Form.Label>
                    <Form.Control
                      type="text"
                      value={width_Product}
                      placeholder="عرض"
                      onChange={(e) => detailHandler(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId="Height" style={{width: "100%"}}>
                    <Form.Label>ارتفاع</Form.Label>
                    <Form.Control
                      type="text"
                      value={height_Product}
                      placeholder="ارتفاع"
                      onChange={(e) => detailHandler(e)}
                    />
                  </Form.Group>
                </div>
                <span className={styles.subtitle}>توضیحات تکمیلی</span>
                {/* form2 -detail=>describe  ///در باره محصول */}
                <div className={styles.form_2} dir="ltr">
                  <Form.Group controlId="titleproduct" style={{width: "100%"}}>
                    <Form.Label> توضیحات تکمیلی</Form.Label>
                    <Form.Control
                      // type="textaria"
                      as="textarea"
                      value={describrtion}
                      row={4}
                      placeholder="توضیحات تکمیلی"
                      onChange={(e) => setDescribtion(e.target.value)}
                      ref={discribeLive_input}
                    />
                  </Form.Group>

                  {/* <span className={styles.done} onClick={e=>setDone(true)}>doen</span> */}
                </div>
                {/*  */}
                {log}
                {(describtionLive === undefined) |
                (describtionLive === "") |
                (describtionLive === null) ? (
                  <div className={styles.live}></div>
                ) : (
                  <div className={styles.live}>
                    <span className={styles.title}>live</span>
                    {(() => {
                      {
                        return describtionLive.map((item, index) => {
                          switch (item.type) {
                            case "p":
                              return <pre key={item}>{item.body}</pre>;
                            case "a":
                              return <a key={item}>{item.body}</a>;
                            case "img":
                              return <img key={item} src={item.body} />;
                            default:
                              return <p key={item}> live </p>;
                          }
                        });
                      }
                    })()}
                  </div>
                )}

                {/* button */}
                <div className={styles.button_new}>
                  <Button
                    type="submit"
                    variant="primary"
                    // className={"create-new"}
                    // className={`${product_img.length > 0 ? "create-new" : "disabled"}`}
                  >
                    Create Note
                  </Button>
                  <Button className="" onClick={resetHandler} variant="danger">
                    Reset Feilds
                  </Button>
                </div>
              </Form>
            </div>
            {}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Newproduct;

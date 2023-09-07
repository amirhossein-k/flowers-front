import React, {useState, useEffect, memo, useContext} from "react";
// import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import "./navbar.css";
import {useNavigate, generatePath, Link, json} from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {useSelector, useDispatch} from "react-redux";
import {delelteBasketUser, logout} from "../../actions/userAction";
import Modals from "../modals/Modals";
import {productContext} from "../../App";
import {listCart} from "../../actions/cartAction";

const Navbarr = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navClose, setNavClose] = useState(true);
  const [productCon, setProductCon] = useContext(productContext);
  // console.log(navClose)
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cartItemOrder, setCartItemOrder] = useState(0);
  const [cartItem, setCartItem] = useState([]);

  const [productListTarget, setProductListTarget] = useState([]);

  // console.log(productCon,'productCon')
  const cart = useSelector((state) => state.cart);
  const {loading: loadingCart, cart: cartMessage, error: errorCart} = cart;

  const cartorder = JSON.parse(localStorage.getItem("cartlist"));

  var plus = 0;

  useEffect(() => {
    if (cartorder && cartorder.length > 0) {
      // setLoading_Cart(true)

      cartorder.map((item) => (plus += item.order));

      setCartItemOrder(plus);

      setCartItem(cartorder);

      // setLoading_Cart(false)
    }
  }, [loadingCart, cartMessage, isOpenCart]);

  // console.log(typeof cartItem,'cartItem')
  const userLogin = useSelector((state) => state.userLogin);
  const {error, loading, userInfo} = userLogin;

  const userLogut = useSelector((state) => state.logout);
  const {userlogout, errorLogout} = userLogut;

  const logouthandler = () => {
    dispatch(logout());
    navigate("/register");
  };

  const handlerDelete = (e) => {
    //
    const id = e.target.id;
    dispatch(delelteBasketUser(id));
  };

  useEffect(() => {
    console.log(userInfo, "user");
    const basket = userInfo?.basket;
    if (basket) {
      setProductListTarget(basket);
      userInfo.basket.map((item) => (plus += item.order));
      // console.log(cartItem,'uu')
      setCartItemOrder(plus);
    }
  }, [loading, userInfo]);
  // useEffect(()=>{
  //   productListTarget.map(item=> plus += item.order)
  // console.log(cartItem,'uu')
  //   setCartItemOrder(plus )
  // setCartItem(JSON.parse(localStorage.getItem('cartlist')) )
  // },[cartItem])

  return (
    <>
      {loading && <Modals />}
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <Nav className="left-nav">
              <Link className="nav-link" onClick={() => setIsOpen(true)}>
                <i className="bi bi-cart">
                  {/* <span className='i_numbers'>{userInfo &&  userInfo.basket.length > 0?  cartItemOrder : cartItemOrder}</span> */}
                </i>
              </Link>

              {userInfo ? (
                <Nav style={{maxHeight: "200px"}} navbarScroll>
                  <NavDropdown
                    title={userInfo?.name}
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item href="/profile" className="dropdown-a">
                      My Profile
                    </NavDropdown.Item>
                    {userInfo.isAdmin && (
                      <NavDropdown.Item
                        href="/dashboard"
                        className="dropdown-a"
                      >
                        داشبورد
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={logouthandler}
                      className="dropdown-a"
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : (
                <Link to="/register" className="nav-link">
                  <i className="bi bi-person"></i>
                </Link>
              )}

              <Link className="nav-link">
                <i className="bi bi-search"></i>
              </Link>
            </Nav>
            <span onClick={(e) => navigate(`/`)}>amir</span>
          </Navbar.Brand>
          <Nav className={`right-nav d-none d-lg-flex `}>
            <Link className="nav-link" to="/products">
              محصولات
            </Link>
            <Link className="nav-link" to="#home">
              مناسبت ها
            </Link>
            <Link className="nav-link" to="#home">
              مجله
            </Link>
          </Nav>
          {/* side bar mobile right */}
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Sidebar
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">مجله</Nav.Link>
                <Nav.Link href="#action2">Sidebar Item 2</Nav.Link>
                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action3">
                    Dropdown Item 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Dropdown Item 2
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Divided Item
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          {/* side bar cart left */}
          {/* <div className='offcanvas_cart'></div> */}
          <div
            className={`sidebar_cart offcanvas_cart-end ${
              isOpen ? "show" : "hiding"
            }`}
          >
            <div className="header">
              <span className="title">سبد خرید</span>
              <span className="close" onClick={() => setIsOpen(false)}>
                <i className="bi bi-x-lg"></i>
              </span>
            </div>
            <div className="body">
              <ul>
                {userInfo &&
                  productListTarget[0] !== null &&
                  productListTarget?.map((it, index) => (
                    <li key={it.product._id}>
                      <div className="img_box">
                        <img src={it.product.pic[0]} />
                      </div>
                      <div className="detail">
                        <div className="title">{it.product.title}</div>
                        <div className="price">{it.product.price}</div>
                      </div>
                      <div className="order">
                        <div className="title">تعداد</div>
                        <div className="number">{it?.order}</div>
                      </div>
                      <div className="icon">
                        <i
                          className="bi bi-x-lg"
                          onClick={(e) => handlerDelete(e)}
                          id={it.product._id}
                        ></i>
                      </div>
                    </li>
                  ))}
              </ul>
              <div className="footer">
                <Link to="/cart">مشاهده سبد خرید</Link>
                <Link to="/checkout"> تسویه حساب</Link>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default memo(Navbarr);

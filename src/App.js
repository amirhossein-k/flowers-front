
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import SingleCategory from "./pages/singleCategory/SingleCategory";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Chekout";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import {listCategory, listProductCategory} from './actions/categoryAction'
import Register from "./pages/register/Register";
import Modals from "./components/modals/Modals";
import { listProduct } from "./actions/productAction";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Newproduct from "./pages/dashboard/newproduct/Newproduct";
import { createContext,useState } from "react";
import Product from "./pages/products/Product";
import { listCart } from "./actions/cartAction";
import Profile from "./pages/profile/Profile";
import { listCityAction } from "./actions/cityAction";


export const productContext = createContext()

function App() {
  const [productCon , setProductCon] = useState([])
  const [productCategory , setProductCategory] = useState([])
  // const [categoryCon , setCategoryCon] = useState([])

  const dispatch = useDispatch()

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin
  // /////////////////////list product
  const productList = useSelector(state=>state.productList)
  const {loadingProduct,errorProduct,product} = productList
  // /////////////////////create product
  const productCreate = useSelector(state=>state.productCreate)
  const {loadingNewProduct,errorNewProduct,successNewproduct ,newproduct} = productCreate
  // /////////////////////list category product
  const productcategory = useSelector(state=>state.categoryListProduct)
  const {loadingNewProductCategory,errorNewProductCategory,successNewproductCategory ,category_product} = productcategory

  
  // var listCart = []
// localStorage.setItem("cart", JSON.stringify(listCart));

 
 
useEffect(()=>{ setProductCon(product)},[product])

// useEffect(()=>{ setProductCategory(category_product?.categoryproduct)},[category_product])

  useEffect(()=>{
    dispatch(listCategory())
    dispatch(listProduct())
    dispatch(listProductCategory())
    dispatch(listCart())
    dispatch(listCityAction())
  
   
},[dispatch])
useEffect(()=>{
  
  if(newproduct)dispatch(listProduct())
 
},[loadingNewProduct,newproduct])

  return (
    <productContext.Provider value={[productCon , setProductCon]}>
    <Routes>
     
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<Product/>} />
      <Route path="/product/:productId" element={<SingleProduct/>}/>
      <Route path="/product-category/productId" element={<SingleCategory/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path='*' element={ <p>404</p>} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/modal" element={<Modals/>}/>
      <Route element={<ProtectedRoute userInfo={userInfo} />}>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/dashboard">
          <Route index element={<Dashboard/>} />
          <Route path="products">
            <Route path="new" element={<Newproduct/>} />
          </Route>
        </Route>
      </Route>
    </Routes>
    </productContext.Provider>
  );
}

export default App;

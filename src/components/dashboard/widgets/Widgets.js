import React from 'react'
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styles from './widgets.module.scss'
const Widgets = ({type}) => {
   
    var data 

    switch (type) {
        case "user":
           data = {
            title: "تعداد محصول",
            isMoney: false,
            // link: "مشاهده کامل",
            amount: '50',
            icon: (
              <DirectionsCarFilledOutlinedIcon
                className="icon"
                style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
              />
            ),
          };
          break;
        case "order":
          data = {
            title: "تعداد محصول فروخته شده",
            isMoney: false,
            // link: "مشاهده کامل",
            amount: '20',
            icon: (
              <ShoppingCartIcon
                className="icon"
                style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
              />
            ),
          };
          break;
        case "erarning":
             data = {
            title: "درامد از فروش",
            isMoney: true,
            // link: "مشاهده کل",
            amount:'1000',
            icon: (
              <MonetizationOnIcon
                className="icon"
                style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }}
              />
            ),
          };
          break;
        
    
        default:
          break;
      }

  return (
    <div className={styles.widget}>
       <div className={styles.left}>
            <span className={styles.title}>{data.title}</span>
            <span className={styles.counter}>{data.amount}</span>
            <span className={styles.link}>{data.link}</span>
        </div>
        <div className={styles.right}>
            <KeyboardArrowUpIcon/>
            <div className={styles.icon}> {data.icon}</div>
        </div>

    </div>
  )
}

export default Widgets
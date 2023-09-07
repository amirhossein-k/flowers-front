import React from 'react'
import styles from './toast.module.scss'
import './toast.css'
const Toast = (props) => {
  return (
    <div className={styles.my_toast}>
        <div className='row'>
            <div className={`col-12 ${styles.my_title} `}>{props.title}</div>
            <div className={`col-12 ${styles.loading} my_toast`}><span></span></div>

        </div>

    </div>
  )
}

export default Toast
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'
export const Notification = () => {

  return (
    <>
        <ToastContainer position='bottom-right' hideProgressBar={true} closeOnClick />
    </>

  )
}

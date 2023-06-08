import React, { useEffect } from "react";
import { Button } from 'antd'
import { loadStripe } from '@stripe/stripe-js';
import { post } from '../../services/axios/baseAPI'
import axios from "axios";

const stripePromise = loadStripe(process.env.REACT_APP_PB_KEY);

const PaymentScreen = () => {

  const handlePayment = () => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SOCKET_URL}/create-checkout-session`,
      headers: { "Content-Type": "application/json" }
    })
      .then(data => {
        console.log('data success: ', data)
        window.open(data.data.url)
      })
      .catch(err => {
        console.log('err data ::>>', err)
      })
  }

  return (
    <div>
      <Button onClick={handlePayment}>Payment</Button>
    </div>
  )
}

export default PaymentScreen
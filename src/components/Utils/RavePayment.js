import React, { useState, useEffect } from 'react'
import { useRavePayment } from 'react-ravepayment'

const RavePayment = (props) => {
   const config = {
      txref: 'rave-123456',
      customer_email: 'wolvecode@gmail.com',
      customer_phone: '234099940409',
      amount: props.toPay,
      PBFPubKey: 'FLWPUBK_TEST-1698436ccb9a38d881340a6c01559c12-X',
      production: false,
   }

   const { initializePayment } = useRavePayment(config)
   return (
      <div>
         <button
            style={{
               width: '20rem',
               height: '3rem',
               color: '#fff',
               fontSize: '1.2rem',
               background: '#2980b9',
               border: 'none',
            }}
            onClick={() => initializePayment()}
         >
            Make Payment
         </button>
      </div>
   )
}

export default RavePayment

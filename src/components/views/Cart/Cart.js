import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
   getCartItems,
   removeCartItem,
   onSuccessBuy,
} from '../../../_actions/user_actions'
import UserCart from './Section/UserCart'
import PayRave from '../../Utils/RavePayment'
import { Result, Empty } from 'antd'
import Axios from 'axios'

function Cart(props) {
   const [Total, setTotal] = useState(0)
   const [ShowTotal, setShowTotal] = useState(false)
   const [ShowSuccess, setShowSuccess] = useState(false)
   const dispatch = useDispatch()

   useEffect(() => {
      let cartItems = []
      if (props.user.userData && props.user.userData.cart) {
         if (props.user.userData.cart.length > 0) {
            props.user.userData.cart.forEach((item) => {
               cartItems.push(item.id)
            })

            dispatch(getCartItems(cartItems, props.user.userData.cart))
         }
      }
   }, [props.user.userData])

   useEffect(() => {
      if (props.user.cartDetail && props.user.cartDetail.length > 0) {
         calculateTotal(props.user.cartDetail)
      }
   }, [props.user.cartDetail])

   // CALCULATE THE TOTAL COST OF PRICE WITH NUMBER OF QUANTITY
   const calculateTotal = (cartDetail) => {
      let total = 0
      cartDetail.map((item) => {
         total += parseInt(item.price, 10) * item.quantity
      })
      setTotal(total)
      setShowTotal(true)
   }

   // ROMOVE FOOD FROM CART
   const removeFromCart = (foodId) => {
      dispatch(removeCartItem(foodId)).then(() => {
         Axios.get('/api/users/userCartInfo').then((response) => {
            if (response.data.success) {
               if (response.data.cartDetail.length > 0) {
                  // calculateTotal(response.data.cartDetail)
                  return response.data.cartDetail
               } else {
                  setShowTotal(false)
               }
            } else {
               alert('Failed to get cart info.')
            }
         })
      })
   }

   //HANDLE SUCCESS TRANSACTION
   const transactionSucess = (data) => {
      console.log(data.tx.id)
      let variables = {
         cartDetail: props.user.cartDetail,
         paymentData: data,
      }

      Axios.post('/api/users/successBuy', variables).then((response) => {
         if (response.data.success) {
            setShowSuccess(true)
            setShowTotal(false)

            dispatch(
               onSuccessBuy({
                  cart: response.data.cart,
                  cartDetail: response.data.cartDetail,
               })
            )
         } else {
            alert('Failed to buy')
         }
      })
   }

   //HANDLE CANCEL TRANSACTION
   const transactionCanceled = () => {
      console.log('Transaction cancel')
      console.log(props.user.cartDetail)
   }

   //HANDLE ERROR TRANSACTION
   const transactionError = () => {
      console.log('Error in payment')
   }
   return (
      <div style={{ width: '85%', margin: '3rem auto' }}>
         <h1 style={{ fontFamily: 'open-sans', fontWeight: 'bolder' }}>
            My Cart
         </h1>
         <div>
            <UserCart
               foods={props.user.cartDetail}
               removeItem={removeFromCart}
            />

            {ShowTotal ? (
               <div
                  style={{
                     marginTop: '3rem',
                     fontFamily: 'Amaranth',
                     fontSize: '1.3rem',
                  }}
               >
                  <h2>Total Amount: ₦{Total}</h2>
               </div>
            ) : ShowSuccess ? (
               <Result status='success' title='Succesfully Purchased Items' />
            ) : (
               <div
                  style={{
                     width: '100%',
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center',
                  }}
               >
                  <Empty description={false} />
                  <p>No Items In The Cart</p>
               </div>
            )}
         </div>

         {ShowTotal && (
            <PayRave
               style={{
                  fontFamily: 'Amaranth, sans-serif',
               }}
               toPay={Total}
               onSuccess={transactionSucess}
               transactionError={transactionError}
               transactionCanceled={transactionCanceled}
               userInfo={props.user.userData}
            />
         )}
      </div>
   )
}

export default Cart

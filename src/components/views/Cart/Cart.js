import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem } from '../../../_actions/user_actions'
import UserCart from './Section/UserCart'
import { Result, Empty } from 'antd'
import Axios from 'axios'

function Cart(props) {
   const [Total, setTotal] = useState('0')
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
         // total = total + parseInt(item.price, 10) * item.quantity
         console.log(total)
      })
      setTotal(total)
      setShowTotal(true)
   }

   // ROMOVE FOOD FROM CART
   const removeFromCart = (foodId) => {
      dispatch(removeCartItem(foodId)).then(() => {
         Axios.get('/api/users/userCartInfo').then((response) => {
            if (response.data.success) {
               if (response.data.cartDetail.length <= 0) {
                  setShowTotal(false)
               } else {
                  calculateTotal(response.data.cartDetail)
               }
            } else {
               alert('Failed to get cart info.')
            }
         })
      })
   }

   return (
      <div style={{ width: '80%', margin: '3rem' }}>
         <h1>My Cart</h1>
         <div
            style={{
               width: '100%',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <UserCart
               foods={props.user.cartDetail}
               removeItem={removeFromCart}
            />

            {ShowTotal ? (
               <div style={{ marginTop: '3rem' }}>
                  <h2>Total Amount:$ {Total}</h2>
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
      </div>
   )
}

export default Cart

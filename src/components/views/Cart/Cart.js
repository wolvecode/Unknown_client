import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems } from '../../../_actions/user_actions'
import UserCart from './Section/UserCart'
import { Result, Empty } from 'antd'

function Cart(props) {
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
        <UserCart foods={props.user.cartDetail} />

        <div style={{ marginTop: '3rem' }}>
          <h2>Total Amount: $</h2>
        </div>
        <Result status='success' title='Succesfully Purchased Items' />
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
      </div>
    </div>
  )
}

export default Cart

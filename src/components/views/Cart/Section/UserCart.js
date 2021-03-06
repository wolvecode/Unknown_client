import React from 'react'
import { Button } from 'antd'

function UserCart(props) {
   const rendercartImage = (images) => {
      if (images.length > 0) {
         let image = images[0]
         return ` http://localhost:5000/${image}`
      }
   }
   const renderItems = () =>
      props.foods &&
      props.foods.map((food) => (
         <tr key={food._id}>
            <td
               style={{
                  fontFamily: 'Courgette, cursive',
               }}
            >
               <img
                  style={{ width: '4rem', height: '3rem' }}
                  src={rendercartImage(food.image)}
                  alt='foodImage'
               />
            </td>
            <td> EA {food.quantity} </td>
            <td> $ {food.price} </td>
            <td>
               <Button
                  type='danger'
                  shape='square'
                  size='medium'
                  onClick={() => props.removeItem(food._id)}
               >
                  Remove
               </Button>
            </td>
         </tr>
      ))
   return (
      <div style={{ marginRight: '3rem', width: '90%' }}>
         <table
            style={{
               width: '100%',
               textJustify: 'center',
               borderCollapse: 'collapse',
            }}
         >
            <thead
               style={{
                  fontFamily: 'Amaranth, san-serif',
               }}
            >
               <tr>
                  <th>Food Image</th>
                  <th>Food Quantity</th>
                  <th>Food Price</th>
                  <th>Remove Item</th>
               </tr>
            </thead>
            <tbody>{renderItems()}</tbody>
         </table>
      </div>
   )
}

export default UserCart

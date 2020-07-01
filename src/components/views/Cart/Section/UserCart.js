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
            <td>
               <img
                  style={{ width: '70px' }}
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
      <div>
         <table>
            <thead>
               <tr style={{ width: '100%', border: '0.5rem solid' }}>
                  <th style={{ paddingRight: '10rem' }}>Food Image</th>
                  <th style={{ paddingRight: '10rem' }}>Food Quantity</th>
                  <th style={{ paddingRight: '10rem' }}>Food Price </th>
                  <th style={{ paddingRight: 'rem' }}>Remove From Cart</th>
               </tr>
            </thead>
            <tbody>{renderItems()} </tbody>
         </table>
      </div>
   )
}

export default UserCart

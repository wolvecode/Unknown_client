import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Collapse } from 'antd'

function HistoryPage() {
   const [History, setHistory] = useState([])
   useEffect(() => {
      Axios.get('/api/users/getHistory').then((response) => {
         if (response.data.success) {
            setHistory(response.data.history)
         } else {
            alert('Failed to get history')
         }
      })
   }, [History])
   return (
      <div style={{ margin: '3rem', width: '80%' }}>
         <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>
            <h1>History</h1>
         </div>
         <div>
            <table
               style={{
                  justifyContent: 'center',
                  textJustify: 'center',
                  borderCollapse: 'collapse',
                  width: '100%',
               }}
            >
               <tr>
                  <th>Food Name</th>
                  <th>Food Price</th>
                  <th>Food Quantity</th>
                  <th>Date Of Purchase</th>
               </tr>
               {History.map((item) => (
                  <tr key={item._id}>
                     <td>{item.name}</td>
                     <td>{item.price}</td>
                     <td>{item.quantity}</td>
                     <td>{item.dateOfPurchase}</td>
                  </tr>
               ))}
            </table>
         </div>
      </div>
   )
}

export default HistoryPage

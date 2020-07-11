import React, { useEffect, useState } from 'react'
import Axios from 'axios'

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
      <div>
         <h1>Hello world</h1>
      </div>
   )
}

export default HistoryPage

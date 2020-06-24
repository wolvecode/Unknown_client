import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd'

function FoodInfo(props) {
  const [Food, setFood] = useState([])

  useEffect(() => {
    setFood(props.detail)
  }, [props.detail])

  const cartHandler = () => {
    props.addToCart(props.detail._id)
  }
  return (
    <div>
      <Descriptions title='Food Info'>
        <Descriptions.Item label='Price'> {Food.price} </Descriptions.Item>
        <Descriptions.Item label='Sold'> {Food.sold} </Descriptions.Item>
        <Descriptions.Item label='View'> {Food.view} </Descriptions.Item>
        <Descriptions.Item label='Description'>
          {Food.description}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button onClick={cartHandler} type='danger' shape='round' size='large'>
          Add To Cart
        </Button>
      </div>
    </div>
  )
}

export default FoodInfo

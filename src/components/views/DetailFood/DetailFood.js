import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import FoodImage from './Sections/FoodImage'
import FoodInfo from './Sections/FoodInfo'
import { addToCart } from '../../../_actions/user_actions'
import { useDispatch } from 'react-redux'
import axios from 'axios'

function DetailProduct(props) {
  const dispatch = useDispatch()

  const [Food, setFood] = useState([])
  const foodId = props.match.params.foodId

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/product/foods_by_id?id=${foodId}&type=single`
      )
      .then((response) => {
        setFood(response.data[0])
      })
  }, [])

  const cartHandler = (foodId) => {
    dispatch(addToCart(foodId))
  }
  return (
    <div className='postPage' style={{ width: '100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{Food.name} </h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24} md={12}>
          <FoodImage detail={Food} />
        </Col>
        <Col lg={12} xs={24} md={12}>
          <FoodInfo addToCart={cartHandler} detail={Food} />
        </Col>
      </Row>
    </div>
  )
}

export default DetailProduct

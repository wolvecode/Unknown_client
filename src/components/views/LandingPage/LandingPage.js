import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import ImagesSlider from '../../Utils/ImageSlider'
import { Col, Card, Row } from 'antd'
const { Meta } = Card

function LandingPage() {
  const [Foods, setFoods] = useState([])
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  useEffect(() => {
    const data = {
      skip: Skip,
      limit: Limit,
    }
    getFood(data)
  }, [])
  const getFood = (data) => {
    axios
      .post('http://localhost:5000/api/product/getFood', data)
      .then((response) => {
        if (response.data.success) {
          setFoods(response.data.foods)
        } else {
          alert('Failed to search food')
        }
      })
  }
  const renderCards = Foods.map((food, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card hoverable={true} cover={<ImagesSlider images={food.image} />}>
          <Meta title={food.name} description={`$${food.price}`}></Meta>
        </Card>
      </Col>
    )
  })
  const loadMore = () => {
    let skip = Skip + Limit

    const data = {
      skip: skip,
      limit: Limit,
    }
    getFood(data)
  }
  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>All Food Available</h2>
      </div>

      {/* filter */}

      {/* search */}

      {Foods.length === 0 ? (
        <div
          style={{
            display: 'flex',
            height: '300px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader
            type='Puff'
            color='#00BFFF'
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      ) : (
        <div>
          <Row gutter={(16, 16)}>{renderCards}</Row>
        </div>
      )}
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={loadMore}>Load More</button>
      </div>
    </div>
  )
}

export default LandingPage

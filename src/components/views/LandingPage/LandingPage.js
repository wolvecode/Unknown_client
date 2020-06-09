import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import ImagesSlider from '../../Utils/ImageSlider'
import { Col, Card, Row } from 'antd'
import CheckBox from './Sections/CheckBox'
const { Meta } = Card

function LandingPage() {
  const [Foods, setFoods] = useState([])
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [PostSize, setPostSize] = useState(0)
  const [Filters, setFilters] = useState({
    shops: [],
    price: [],
  })
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
        console.log(response.data)
        if (response.data.success) {
          if (data.loadMore) {
            setFoods([...Foods, ...response.data.foods])
          } else {
            setFoods(response.data.foods)
          }
          setPostSize(response.data.postSize)
        } else {
          alert('Failed to search food')
        }
      })
  }

  const loadMore = () => {
    let skip = Skip + Limit

    const data = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    }
    getFood(data)
    setSkip(skip)
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

  const showFilteredResults = (filters) => {
    const data = {
      skip: 0,
      limit: Limit,
      filters: filters,
    }

    getFood(data)
    setSkip(0)
  }
  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters }
    newFilters[category] = filters

    if (category === 'price') {
    }
    showFilteredResults(newFilters)
    setFilters(newFilters)
  }
  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>All Food Available</h2>
      </div>

      {/* filter */}
      <CheckBox handleFilters={(filters) => handleFilters(filters, 'shop')} />

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
            color='lightgreen'
            height={100}
            width={100}
            // timeout={10000} //3 secs
          />
        </div>
      ) : (
        <div>
          <Row gutter={(16, 16)}>{renderCards}</Row>
        </div>
      )}
      <br />
      <br />
      {PostSize >= Limit && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={loadMore}>Load More</button>
        </div>
      )}
    </div>
  )
}

export default LandingPage

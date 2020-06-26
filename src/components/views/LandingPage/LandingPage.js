import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import ImagesSlider from '../../Utils/ImageSlider'
import { Col, Card, Row } from 'antd'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import { prices, shops } from './Sections/Datas'
import SearchFeature from './Sections/SearchFeature'

const { Meta } = Card

function LandingPage(props) {
   const [Foods, setFoods] = useState([])
   const [Skip, setSkip] = useState(0)
   const [Limit, setLimit] = useState(12)
   const [PostSize, setPostSize] = useState(0)
   const [SearchTerms, setSearchTerms] = useState('')
   const [Filters, setFilters] = useState({
      shops: [],
      prices: [],
   })

   useEffect(() => {
      const data = {
         skip: Skip,
         limit: Limit,
      }
      getFood(data)
   }, [])

   // GET FOOD DATA FROM THE DATABASE
   const getFood = (data) => {
      axios
         .post('http://localhost:5000/api/product/getFood', data)
         .then((response) => {
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

   //LOAD MORE BUTTON
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

   // RENDER FOOD TEMPLATE
   const renderCards = Foods.map((food, index) => {
      return (
         <Col lg={4} md={6} xs={12}>
            <Card
               style={{ marginBottom: '1.5rem' }}
               hoverable={true}
               cover={
                  <a href={`/product/${food._id}`}>
                     <ImagesSlider images={food.image} />
                  </a>
               }
            >
               <Meta title={food.name} description={`$${food.price}`}></Meta>
            </Card>
         </Col>
      )
   })

   //DISPLAY RESULT FROM FILTERED
   const showFilteredResults = (filters) => {
      const data = {
         skip: 0,
         limit: Limit,
         filters: filters,
      }

      getFood(data)
      setSkip(0)
   }
   //HANDLE PRICE
   const handlePrice = (value) => {
      const data = prices
      let array = []

      for (let key in data) {
         if (data[key]._id === parseInt(value, 10)) {
            array = data[key].array
         }
      }
      return array
   }

   //TO FILTER FOR SHOPS AND PRICES
   const handleFilters = (filters, category) => {
      const newFilters = { ...Filters }
      newFilters[category] = filters
      console.log(newFilters)

      if (category === 'price') {
         let priceValue = handlePrice(filters)
         newFilters[category] = priceValue
      }
      showFilteredResults(newFilters)
      setFilters(newFilters)
   }
   //UPDATE SEARCH TERM
   const updateSearchTerms = (newSearchTerm) => {
      console.log(SearchTerms)
      let data = {
         skip: 0,
         limit: Limit,
         filters: Filters,
         searchTerm: newSearchTerm,
      }
      setSkip(0)
      setSearchTerms(newSearchTerm)
      getFood(data)
   }
   return (
      <div style={{ width: '75%', margin: '3rem auto' }}>
         <div style={{ textAlign: 'center' }}>
            <h2>All Food Available</h2>
         </div>
         {/* filter */}
         prices, shops
         <div style={{ display: 'flex' }}>
            <div>
               <Row gutter={[16, 16]}>
                  <Col lg={12} xs={24} md={12}>
                     <CheckBox
                        shops={shops}
                        handleFilters={(filters) =>
                           handleFilters(filters, 'shop')
                        }
                     />
                  </Col>
                  <Col lg={12} xs={24} md={12}>
                     <RadioBox
                        prices={prices}
                        handleFilters={(filters) =>
                           handleFilters(filters, 'price')
                        }
                     />
                  </Col>
               </Row>
               <br />
               {/* search */}
               <SearchFeature refreshFunction={updateSearchTerms} />
               <br />
            </div>
         </div>
         {Foods.length === 0 ? (
            <div
               style={{
                  display: 'flex',
                  height: '30rem',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            >
               <Loader
                  type='Puff'
                  color='lightgreen'
                  height={100}
                  width={100}
                  timeout={5000} //3 secs
               />
            </div>
         ) : (
            <div>
               <br />
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

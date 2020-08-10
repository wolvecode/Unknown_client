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
   const [Limit, setLimit] = useState(6)
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
         <Col lg={4} md={12} xs={12}>
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
      <div>
         <div className='top-landing'>
            <div className='landing-search'>
               <SearchFeature refreshFunction={updateSearchTerms} />
            </div>
            {/* <div>
               <CheckBox
                  shops={shops}
                  handleFilters={(filters) => handleFilters(filters, 'shop')}
               />
            </div> */}
         </div>
         <div>
            <div className='available-food'>
               <h2>Available Foods</h2>
            </div>
            <div className='display-food'>
               {Foods.length === 0 ? (
                  <div
                     style={{
                        display: 'flex',
                        justifyContent: 'center',
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
                  <div
                     style={{
                        display: 'flex',
                        justifyContent: 'center',
                     }}
                  >
                     <button onClick={loadMore}>Load More</button>
                  </div>
               )}
            </div>
         </div>
         <div className='middle-landing'>
            <div className='how-it-works'>
               <h3>HOW IT WORKS</h3>
               <div className='work-section'>
                  <div className='work'>
                     <span>
                        <i class='fas fa-map-marker-alt'></i>
                     </span>
                     <h4>Discover</h4>
                     <p>Find Your Local restaurants</p>
                  </div>
                  <div className='work'>
                     <span>
                        <i class='fas fa-clipboard-check'></i>
                     </span>
                     <h4>Add Your Menu</h4>
                     <p>Choose Your favourite Menu</p>
                  </div>
                  <div className='work'>
                     <span>
                        <i class='fas fa-money-check-alt'></i>
                     </span>
                     <h4>Place Order</h4>
                     <p>Pay by Card online Or Cash on Delivery</p>
                  </div>
                  <div className='work'>
                     <span>
                        <i class='fas fa-truck'></i>
                     </span>
                     <h4>Get Delivered</h4>
                     <p>Food is delivered at your doorstep</p>
                  </div>
               </div>
            </div>
            {/* <div className='favourite-restaurant'>
               <h3>FAVOURITE RESTAURANT</h3>
               <div className='restau'></div>
               <div className='restaurant-section'></div>
            </div> */}
            <div className='cuisines'>
               <h3>CUISINES</h3>
               <div className='cuisines-section'>
                  <div className='cuise'>
                     <p>American</p>
                     <p>Pizza</p>
                     <p>Pastries and Cakes</p>
                  </div>
                  <div className='cuise'>
                     <p>Nigerian</p>
                     <p>Chinese</p>
                     <p>Beverage Drinks</p>
                  </div>
                  <div className='cuise'>
                     <p>Vegetarian</p>
                     <p>African</p>
                     <p>Breakfast</p>
                  </div>
                  <div className='cuise'>
                     <p>Alcoholic Drinks</p>
                     <p>Carribean</p>
                     <p>Burgers</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default LandingPage

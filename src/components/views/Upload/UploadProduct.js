import React, { useState } from 'react'
import axios from 'axios'
import FileUpload from '../../Utils/FileUpload'

const shops = [
   { key: 1, value: 'shop1' },
   { key: 2, value: 'shop2' },
   { key: 3, value: 'shop3' },
   { key: 4, value: 'shop4' },
   { key: 5, value: 'shop5' },
]

const categories = [
   { key: 1, value: 'mixed' },
   { key: 2, value: 'individual' },
]

function UploadProduct(props) {
   const [Food, setfood] = useState('')
   const [Description, setDescription] = useState('')
   const [Price, setPrice] = useState('')
   const [Shops, setShops] = useState(1)
   const [Category, setCategory] = useState(1)
   const [Images, setImages] = useState([])

   const handleFood = (e) => {
      setfood(e.target.value)
   }
   const handleDescription = (e) => {
      setDescription(e.target.value)
   }
   const handlePrice = (e) => {
      setPrice(e.target.value)
   }
   const handleShops = (e) => {
      setShops(e.target.value)
   }

   const handleCategory = (e) => {
      setCategory(e.target.value)
   }

   const updateImages = (newImages) => {
      console.log(newImages)
      setImages(newImages)
   }
   const onSubmit = (e) => {
      e.preventDefault()

      if (!Food || !Description || !Price || !Shops || !Images || !Category) {
         return alert('Please fill all fields!')
      }

      const data = {
         owner: props.user.userData._id,
         name: Food,
         description: Description,
         price: Price,
         shop: Shops,
         image: Images,
         categories: Category,
      }
      axios
         .post('http://localhost:5000/api/product/uploadFood', data)
         .then((response) => {
            if (response.data.success) {
               alert('Food successfully uploaded')
               props.history.push('/')
            } else {
               alert('Falied to upload food')
            }
         })
   }
   return (
      <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
         <div style={{ textAlign: 'center', marginBottom: '2rem ' }}>
            <h2>Upload Food</h2>
         </div>
         <form onSubmit={onSubmit}>
            <FileUpload refreshFunction={updateImages} />
            <br />
            <br />
            <label style={{ fontSize: '1rem' }}>Name Of Food</label>
            <input
               style={{ width: '100%', height: '35px' }}
               type='text'
               onChange={handleFood}
               value={Food}
            />
            <br />
            <br />
            <label style={{ fontSize: '1rem' }}> Description</label>
            <textarea
               style={{ width: '100%', height: '35px' }}
               cols='30'
               rows='30'
               onChange={handleDescription}
               value={Description}
            ></textarea>
            <br />
            <br />
            <label style={{ fontSize: '1rem' }}> Price </label>
            <input
               style={{ width: '100%', height: '35px' }}
               type='text'
               onChange={handlePrice}
               value={Price}
            />
            <br />
            <br />
            <div style={{ display: 'flex', width: '100%' }}>
               <div
                  style={{
                     // float: 'left',
                     width: '50%',
                     height: '35px',
                     marginRight: '2rem',
                  }}
               >
                  <select
                     style={{ width: '100%', height: '35px' }}
                     onChange={handleShops}
                  >
                     {shops.map((shop) => (
                        <option key={shop.key} value={shop.key}>
                           {shop.value}
                        </option>
                     ))}
                  </select>
               </div>
               <div style={{ float: 'right', width: '50%', height: '35px' }}>
                  <select
                     style={{ width: '100%', height: '35px' }}
                     onChange={handleCategory}
                  >
                     {categories.map((category) => (
                        <option key={category.key} value={category.key}>
                           {category.value}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
            <br />
            <br />
            <div>
               <input
                  onClick={onSubmit}
                  style={{ width: '20%', height: '35px' }}
                  type='submit'
                  value='Submit'
               />
            </div>
         </form>
      </div>
   )
}

export default UploadProduct

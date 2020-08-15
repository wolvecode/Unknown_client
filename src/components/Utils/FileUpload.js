import React, { useState } from 'react'
import FormData from 'form-data'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { Icon } from 'antd'

function FileUpload(props) {
   const [Images, setImages] = useState([])

   const onDrop = (files) => {
      let formData = new FormData()
      const config = {
         header: {
            'Content-Type': 'multipart/form-data',
         },
      }
      formData.append('file', files[0])

      //Saving image inside the node server
      axios
         .post(
            'http://localhost:5000/api/product/uploadImage',
            formData,
            config
         )
         .then((response) => {
            if (response.data.success) {
               setImages([...Images, response.data.image])
               props.refreshFunction([...Images, response.data.image])
            } else {
               alert('failed to save image')
            }
         })
   }

   const handleDelete = (image) => {
      const currentIndex = Images.indexOf(image)
      let newImages = [...Images]
      newImages.splice(currentIndex, 1)
      setImages(newImages)
      props.refreshFunction(newImages)
   }
   return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
         <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
               <div
                  style={{
                     width: '300px',
                     height: '200px',
                     border: '1px solid lightgray',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                  }}
                  {...getRootProps()}
               >
                  <input {...getInputProps()} />
                  <Icon type='plus' style={{ fontStyle: '3rem' }} />
               </div>
            )}
         </Dropzone>
         <div
            style={{
               display: 'flex',
               width: '300px',
               height: '200px',
               overflowX: 'scroll',
            }}
         >
            {Images.map((image, index) => (
               <div onClick={() => handleDelete(image)}>
                  <img
                     style={{
                        minWidth: '300px',
                        height: '180px',
                        width: '240px',
                     }}
                     key={index}
                     src={`http://localhost:5000/${image}`}
                     alt={`foodImg-${index}`}
                  />
               </div>
            ))}
         </div>
      </div>
   )
}

export default FileUpload

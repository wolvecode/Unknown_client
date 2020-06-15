import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'

function FoodImage(props) {
  const [Images, setImages] = useState([])

  useEffect(() => {
    console.log(props.detail)
    if (props.detail.image && props.detail.image.length > 0) {
      let images = []

      props.detail.image &&
        props.detail.image.map((item) => {
          images.push({
            original: `http://localhost:5000/${item}`,
            thumbnail: `http://localhost:5000/${item}`,
          })
        })
      setImages(images)
    }
  }, [props.detail])
  console.log(Images)
  return (
    <div>
      <ImageGallery autoPlay items={Images} />
    </div>
  )
}

export default FoodImage

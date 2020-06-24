import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'

function FoodImage(props) {
  const [Images, setImages] = useState([])

  useEffect(() => {
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

  return (
    <div>
      <ImageGallery autoPlay items={Images} />
    </div>
  )
}

export default FoodImage

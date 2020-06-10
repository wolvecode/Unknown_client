import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd'

const Panel = Collapse

const shops = [
  { _id: 1, name: 'shop1' },
  { _id: 2, name: 'shop2' },
  { _id: 3, name: 'shop3' },
  { _id: 4, name: 'shop4' },
  { _id: 5, name: 'shop5' },
]

function CheckBox(props) {
  const [Checked, setChecked] = useState([])

  const handleToggle = (shop) => {
    const currentIndex = Checked.indexOf(shop)
    const newChecked = [...Checked]

    if (currentIndex === -1) {
      newChecked.push(shop)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
    props.handleFilters(newChecked)
  }

  const renderCheckboxList = () =>
    shops.map((shop, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(shop._id)}
          type='checkbox'
          checked={Checked.indexOf(shop._id) === -1 ? false : true}
        />
        <span> {shop.name} </span>
      </React.Fragment>
    ))
  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header='Shops' key='1'>
          {renderCheckboxList()}
        </Panel>
      </Collapse>
    </div>
  )
}

export default CheckBox

import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd'

const Panel = Collapse

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
    props.shops.map((shop, index) => (
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
        <Panel header='shops' key='1'>
          {renderCheckboxList()}
        </Panel>
      </Collapse>
    </div>
  )
}

export default CheckBox

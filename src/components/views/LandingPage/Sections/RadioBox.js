import React, { useState } from 'react'
import { Radio, Collapse } from 'antd'

const Panel = Collapse

const prices = [
  { _id: 0, name: 'any', array: [] },
  { _id: 0, name: '$0, $1000', array: [0, 1000] },
  { _id: 0, name: '$1000 to $1500', array: [1000, 1500] },
  { _id: 0, name: '$1500 to $2000', array: [1500, 2000] },
  { _id: 0, name: '$2000 to $2500', array: [2000, 2500] },
  { _id: 0, name: '$2500 to $3000', array: [2500, 3000] },
]

function RadioBox() {
  const renderRadioList = () =>
    prices.map((price, index) => (
      <Radio key={price._id} value={`${price._id}`}>
        {price.name}
      </Radio>
      // <span> {price.name} </span>
    ))
  return (
    <div>
      <div>
        <Collapse defaultActiveKey={['0']}>
          <Panel header key='1'>
            <Radio.Group>{renderRadioList()}</Radio.Group>
          </Panel>
        </Collapse>
      </div>
    </div>
  )
}

export default RadioBox

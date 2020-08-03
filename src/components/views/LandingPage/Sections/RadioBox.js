import React, { useState } from 'react'
import { Radio, Collapse } from 'antd'

const Panel = Collapse

function RadioBox(props) {
   const [Value, setValue] = useState('0')
   const renderRadioList = () =>
      props.prices.map((price) => (
         <Radio key={price._id} value={`${price._id}`}>
            {price.name}
         </Radio>
      ))

   const handleRadio = (e) => {
      setValue(e.target.value)
      props.handleFilters(e.target.value)
   }
   return (
      <div>
         <div>
            <Collapse defaultActiveKey={['0']}>
               <Panel header='price' key='1'>
                  <Radio.Group onChange={handleRadio} value={Value}>
                     {renderRadioList()}
                  </Radio.Group>
               </Panel>
            </Collapse>
         </div>
      </div>
   )
}

export default RadioBox

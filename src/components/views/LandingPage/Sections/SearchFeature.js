import React, { useState } from 'react'
import { Input } from 'antd'

const { Search } = Input
function SearchFeature(props) {
   const [SearchTerms, setSearchTerms] = useState('')
   const changeSearch = (e) => {
      setSearchTerms(e.target.value)
      props.refreshFunction(e.target.value)
   }
   return (
      <div>
         <div
            style={{
               display: 'flex',
               float: 'right',
               height: '4.2em',
               width: '20.2em',
            }}
         >
            <Search
               onChange={changeSearch}
               value={SearchTerms}
               placeholder='Search Food by typing...'
            />
            <br />
         </div>
      </div>
   )
}

export default SearchFeature

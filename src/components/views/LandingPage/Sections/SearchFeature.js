import React, { useState } from 'react'
import { Input } from 'antd'
import { changeConfirmLocale } from 'antd/lib/modal/locale'

const { Search } = Input
function SearchFeature(props) {
   const [SearchTerms, setSearchTerms] = useState('')
   const changeSearch = (e) => {
      setSearchTerms(e.target.value)
      props.refreshFunction(e.target.value)
   }
   return (
      <div>
         <div style={{ display: 'flex', float: 'right' }}>
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

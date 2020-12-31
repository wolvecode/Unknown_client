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
         <div>
            <div className='search'>
               <Search
                  onChange={changeSearch}
                  size={'large'}
                  value={SearchTerms}
                  placeholder='Search Food by typing...'
               />
            </div>
         </div>
         <div className='search-header'>
            <h1>We deliver to your doorstep</h1>
         </div>
      </div>
   )
}

export default SearchFeature

import React, { useState } from 'react'

const SearchBox = ({onSearch}) => {

  const [searchText, setSearchText] = useState("");

  const handleChange = (ev) => {

    const text = ev.target.value;
    setSearchText(text);
    onSearch(text);
  }
  return (
    
    <div className="input-group mb-3">

      <input type="text" className='form-control' placeholder='Search item...' value={searchText} onChange={handleChange} />

      <span className='input-group-text bg-warning'>
        <i className="bi bi-search"></i>
      </span>
    </div>
  )
}

export default SearchBox
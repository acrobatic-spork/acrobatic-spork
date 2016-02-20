import React from 'react'

const Category = (props) => (
    <div> 
       <input className="category-input" type="checkbox" value="{props.name}"/>{props.name}
    </div>
  )

export default Category
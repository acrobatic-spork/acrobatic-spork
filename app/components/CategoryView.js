import React from 'react'

const Category = (props) => (
    <li> 
       <input className="category-input" type="checkbox" value="{props.name}"/>{props.name}
    </li>
  )

export default Category
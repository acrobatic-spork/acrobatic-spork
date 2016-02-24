import React from 'react'

const Category = (props) => (
    <li> 
       <input className="category-input" type="checkbox" value={props.name} onChange={ props.updateFoodPrefs }/>{props.name}
    </li>
  )

export default Category;
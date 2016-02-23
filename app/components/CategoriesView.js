import React from 'react';
import CategoryView from './CategoryView.js';

class Categories extends React.Component {
  constructor(props){
    super(props);
  }
  
  
  render (){

    var categories = ['Mexican', 'Italian', 'Bars', 'Pizza']
    var categoryViews = categories.map( (category, i) => 
                          <CategoryView name={ category } key={ i }/>
                        )
    
    return (
      <ul>
      { categoryViews }
      </ul>)
  }
}
export default Categories;
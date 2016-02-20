import React from 'react';
import CategoryView from './CategoryView.js';

class Categories extends React.Component {
  constructor(props){
    super(props);
  }
  

  
  render (){

    var categories = ['Mexican', 'Italian', 'Bars', 'Pizza']
    var categoryViews = categories.map( category => 
                          <CategoryView name={ category }/>
                        )
    
    return (
      <div>
      { categoryViews }
      </div>)
  }
}
export default Categories
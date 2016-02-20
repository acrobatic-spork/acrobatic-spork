import React from 'react';

class Categories extends React.Component {
  constructor(props){
    super(props);
  }

  
  render (){
    var categories = ['Mexican', 'Italian', 'Bars', 'Pizza']

    var categoryViews = categories.map( category => 
        (
        <div>
          <div> { category }</div>
        </div>
        ))
    
    return (
      <div>
      { categoryViews }
      </div>)
  }
}
export default Categories
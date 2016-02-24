import React from 'react';
import CategoryView from './CategoryView.js';

class Categories extends React.Component {
  constructor(props){
    super(props);
  }

  updateFoodPrefs (e) {
    e.preventDefault();
    console.log(e.target.value);
    this.props.updatePreferences({foodTypes: ['pizza']});
  }
  
  
  render (){

    var categories = ['Mexican', 'Italian', 'Bars', 'Pizza']
    var categoryViews = categories.map( (category, i) => 
                          <CategoryView name={ category } key={ i } updateFoodPrefs={ this.updateFoodPrefs.bind(this) }/>
                        )
    
    return (
      <ul>
      { categoryViews }
      </ul>)
  }
}
export default Categories;
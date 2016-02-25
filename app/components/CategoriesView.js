import React from 'react';
import CategoryView from './CategoryView.js';

class Categories extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      foodsChecked: []
    };
  }

  // Could use this if we want to let them create a list
  // of prefs and then randomly pick one for the 
  // 4 square query
  // Move the handler to dashboard so that all prefs are set onSubmit

  updateFoodPrefs (e) {
    var currentFoods = this.state.foodsChecked.slice();
    if(e.currentTarget.checked) {
      currentFoods.push(e.target.value);
    } else {
      var index = currentFoods.indexOf(e.target.value);
      currentFoods.splice(index, 1);
    }

    this.setState({
      foodsChecked: currentFoods
    });

    this.props.updatePreferences({foodTypes: currentFoods});
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
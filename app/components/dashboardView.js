import React from 'react';
import InputRange from 'react-input-range';
import { browserHistory, Router, Route, Link } from 'react-router'
import CategoriesView from './CategoriesView.js';
import utils from './utils';


class Dashboard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      priceValue: 2,
      values: {
        min: 1,
        max: 5
      }
    }
  }

  priceChange (component, value) {
    this.setState({
      priceValue: value
    });
  }

  handleSubmit (e) {
    e.preventDefault();

    // Get the values from the form
    var prefs = {
      price: this.refs.price.value,
      stars: this.refs.stars.value,
      distance: this.refs.distance.value
    };

    var username = this.props.getUsername();

  }

  handleValuesChange(component, values) {
    console.log(values);
  }

  render (){
    var categories = ['Mexican', 'Italian', 'Bars', 'Pizza'];

    return (
      <form name='preferences' className='prefernces' onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <legend>Dashboard</legend>

          <InputRange
            maxValue={20}
            minValue={0}
            value={this.state.values}
            onChange={this.handleValuesChange.bind(this)}
          />

          <label className='price' htmlFor='price'>Price:</label>
          <InputRange className='price' name='price' type='range' />
          <label className='stars' htmlFor='stars'>Minimum Star Rating:</label>
          <input type='number' className='stars' name='stars' ref='stars'/>
          <label className='distance' htmlFor='distance'>Maximum Distance:</label>
          <input type='number' className='distance' name='distance' ref='distance'/>
          <div className='category'>Restaurants</div>
          <CategoriesView updatePreferences={this.props.updatePreferences.bind(this)} />
          <button type='submit'>Submit</button>
        </fieldset>
      </form>
      )
  }
}

export default Dashboard;
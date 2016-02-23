import React from 'react';
import { browserHistory, Router, Route, Link } from 'react-router'
import CategoriesView from './CategoriesView.js';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }

  // add state to track selected cats?

  handleSubmit (e) {
    e.preventDefault();
    // Get the values from the form
    var prefs = {
      price: this.refs.price.value,
      stars: this.refs.stars.value,
      distance: this.refs.distance.value
    };
    // Do a put request to update the user's prefs
      // on done, change the state
    var username = this.props.getUsername();
    utils.updatePrefs(prefs, username, (updated) => {
      if (updated) {
        this.props.updatePreferences(prefs);
      } else {
        console.log('Not updated preferences in server')
      }
    });
  }

  render (){
    var categories = ['Mexican', 'Italian', 'Bars', 'Pizza'];

    return (
      <form name='preferences' className='prefernces' onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <legend>Dashboard</legend>
          <label className='price' htmlFor='price'>Maximum Price:</label>
          <input type='number' className='price' name='price' ref='price' />
          <label className='stars' htmlFor='stars'>Minimum Star Rating:</label>
          <input type='number' className='stars' name='stars' ref='stars'/>
          <label className='distance' htmlFor='distance'>Maximum Distance:</label>
          <input type='number' className='distance' name='distance' ref='distance'/>
          <div className='category'>Restaurants</div>
          <CategoriesView />
          <button type='submit'>Submit</button>
        </fieldset>
      </form>
      )
  }
}

export default Dashboard;
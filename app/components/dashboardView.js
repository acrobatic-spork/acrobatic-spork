import React from 'react';
import { browserHistory, Router, Route, Link } from 'react-router'


class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }

  handleSubmit (e) {
    e.preventDefault();
    // Get the values from the form
    // Do a put request to update the user's prefs
      // on done, change the state
  }

  render (){
    return (
      <form name='preferences' className='prefernces'>
        <fieldset>
          <legend>Dashboard</legend>
            <label className='price' htmlFor='price'>Maximum Price:</label>
            <input type='number' className='price' name='price' />
            <label className='stars' htmlFor='stars'>Minimum Star Rating:</label>
            <input type='number' className='stars' name='stars' />
            <label className='distance' htmlFor='distance'>Maximum Distance:</label>
            <input type='number' className='distance' name='distance' />
            <div className='category'>Restaurants</div>
          <Link to="/categories">Category</Link>          
          { this.props.children }
          <button type='submit' onSubmit={this.handleSubmit.bind(this)}>Submit</button>
        </fieldset>
      </form>
      )
  }
}

export default Dashboard
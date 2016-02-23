import React from 'react';
import { browserHistory, Router, Route, Link } from 'react-router'


class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.onSubmit(this.refs.username.value, this.refs.password.value);
  }

  render (){
    return (
      <form name='preferences' className='prefernces'>
        <legend>Dashboard</legend>
          <label className='price' for='price'>Maximum Price:</label>
          <input type='number' className='price' name='price' />
          <label className='stars' for='stars'>Minimum Star Rating:</label>
          <input type='number' className='stars' name='stars' />
          <label className='distance' for='distance'>Maximum Distance:</label>
          <input type='number' className='distance' name='distance' />
          <div className='category'>Restaurants</div>
        <Link to="/categories">Category</Link>          
        { this.props.children }
        <button type='submit' onSubmit={this.handleSubmit.bind(this)}>Submit</button>
      </form>
      )
  }
}

export default Dashboard
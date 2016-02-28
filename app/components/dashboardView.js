import React from 'react';
import { browserHistory, Router, Route, Link } from 'react-router'
import CategoriesView from './CategoriesView.js';
import utils from './utils';
import styles from '../styles/styles.css'


class Dashboard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      price: 2,
      range: 2,
      chooseFood: true
    }
  }

  showDollars(num) {
    var result = '';
    for (var i = 0; i < num; i++) {
      result += '$';
    }
    return result;
  }

  componentDidMount () {
    this.props.displayMessage('');
  }

  prefsChange (e) {
    var value = e.target.value;
    var slider = e.currentTarget.name;
    if(slider === 'price') {
      this.setState({
        price: +value
      });
    } else if(slider === 'radius') {
      this.setState({
        range: +value
      });
    } else {
      this.setState(function(prevState) {

        return {chooseFood: !prevState.chooseFood}
      });
    }

    console.log(this.state);
  }

  handleSubmit (e) {
    e.preventDefault();

    // Get the values from the form
    var prefs = {
      price: this.state.price,
      range: this.state.range,
      chooseFood: this.state.chooseFood
    };

    this.props.updatePreferences(prefs);
  }

  render (){
    var categories = ['Mexican', 'Italian', 'Bars', 'Pizza'];
    return (
      <div className={styles['content']}>
      <form name='preferences' className='prefernces' onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <legend>Dashboard</legend>
          <div className={styles['form-item']} >
            <label className={styles['slider-label']} htmlFor='price'>Price:</label>
            <input className='price' name='price' type='range' min='1' max='4' value={this.state.price} onChange={this.prefsChange.bind(this)}/>
            <span className={styles['slider-val']}>{this.showDollars(this.state.price)}</span>
          </div>
          <div className={styles['form-item']} >
          <label className={styles['slider-label']} htmlFor='radius'>Max Distance:</label>
          <input className='radius' name='radius' type='range' min='1' max='8' value={this.state.range} onChange={this.prefsChange.bind(this)}/>
          <span className={styles['slider-val']}>{this.state.range} mi.</span>
          </div>
          <div className={styles['form-item']} >
            <div className={styles["onoffswitch"]}>
              <input type="checkbox" name="onoffswitch" className={styles["onoffswitch-checkbox"]} id="myonoffswitch" onChange={this.prefsChange.bind(this)} />
              <label className={styles["onoffswitch-label"]} htmlFor="myonoffswitch">
                <span className={styles["onoffswitch-inner"]}></span>
                <span className={styles["onoffswitch-switch"]}></span>
              </label>
            </div>
          </div>


          <button type='submit'>Submit</button>
        </fieldset>
      </form>
      </div>
      )
  }
}

export default Dashboard;
import React from 'react';
import ReactInterval from 'react-interval';
import { browserHistory, Router, Route, Link } from 'react-router'


const Loading = (props) => (
	<div>
	<div className='loading'>
	<img src="images/wc-spork.png" />
	</div>

	<ReactInterval timeout={1000} enabled={true}
	    callback={() => {
	      console.log("Loading..");
	      console.log('status...: ', props.status);
		  if (props.status !== undefined) {
		  	browserHistory.push('/status') 
		  }
	    }
	  } />
	  </div>
	)

export default Loading;
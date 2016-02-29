import React from 'react';
import ReactInterval from 'react-interval';
import { browserHistory, Router, Route, Link } from 'react-router'


const Loading = (props) => {
	if (!props.store.status) const options = {enabled : true}
	return	(
		<div>
		<div className='loading'>
		<img src="images/wc-spork.png" />
		</div>

		<ReactInterval timeout={1000} enabled={options.enabled}
		    callback={() => {
		      console.log("Loading..");
			  if (props.store.status !== undefined) {
			  	options.enabled = false;
			  	browserHistory.push('/status');
			  }
		    }
		  } />
		  </div>
		)
	
}

export default Loading;
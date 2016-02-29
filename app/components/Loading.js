import React from 'react';
import ReactInterval from 'react-interval';
import { browserHistory, Router, Route, Link } from 'react-router'


const Loading = (props) => {

	return	(
		<div>
		<div className='loading'>
		<img src="images/wc-spork.png" />
		</div>
		{console.log('props.store.isLoading: ', props.store.isLoading)}
		<ReactInterval timeout={1000} enabled={props.store.isLoading}
		    callback={() => {
		      console.log("Loading..");
			  if (props.store.status !== undefined) {
				props.store.loadingToggle();
			  	browserHistory.push('/status');
			  }
		    }
		  } />
		  </div>
		)
	
}

export default Loading;
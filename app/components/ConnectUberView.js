import React from 'react'

class Category extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div> 
        <button type="submit" className="connect-uber">
             <a href="https://login.uber.com/oauth/v2/authorize?response_type=code&client_id=x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m">Connect Your Uber Account</a>
        </button>
      </div>
    )  
  }
}
export default Category
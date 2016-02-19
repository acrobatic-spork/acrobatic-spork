var Signin = (props) => (
  <div className="">
    <form className="loginform" onSubmit={props.onSubmit} >
      <input className="username" type="text" name="username"  placeholder="username" />
      <input className="passord" type="password" name="password"  placeholder="passord" />
        <button type="submit" className="">
          <span className="">Signin/Signup</span>
      </button>
    </form>
  </div> 
)

window.Signin = Signin;
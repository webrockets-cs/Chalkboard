import React, { Component } from 'react';
import '../../Style.css'
class Login extends Component {
  constructor(props) {
    super(props)
  }




  
  componentDidMount() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const loginButton = document.getElementById('login');
    loginButton.onclick = () => {
      this.props.onLogged(username.value, password.value);
      username.value = '';
      password.value = '';
    }
    const signupButton = document.getElementById('signup');
    signupButton.onclick = () => {
      this.props.onSignUp(username.value, password.value);
      username.value = '';
      password.value = '';
    }
  }

  render() {
    return(
      <div className='form'>
        {/* <form> */}
          <input name="username" type="text" placeholder="username" id="username"></input>
          <input name="password" type="password" placeholder="password" id="password"></input>
          <input type='button' value='Log In' id="login"/>  
        {/* </form> */}
        <input type="button" id="signup" name="signup" value="Sign up" />
        <br></br>
        <a href='/auth/user' className='githubLogin'>Log in with Github</a>
        {/* path="/login" render={(routeProps) => (
        <Login onLogged={ this.onLogged } */}
      </div>
    )
  }
}

export default Login;


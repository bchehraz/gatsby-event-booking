import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import Form from './Form';
import View from './View';
import AuthContext from '../context/auth-context';
import delay from '../utils/delay';

const ERRORS = {
  loginFail: "Email or password is incorrect",
  signUpFail: "This email is already signed up",
  emptyEmail: "Email field is empty",
  emptyPassword: "Password field is empty",
  emptyFields: "Enter a valid email and password combination",
}

const SUCCESS_LABEL = {
  login: 'Login Successful!',
  signUp: 'Success! Logging in...'
}

const LOADING_LABEL = {
  login: 'Validating...',
  signUp: 'Creating Account...'
}

class Login extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      password: ``,
      signUp: props.signUp,
      error: null,
      selectable: true,
    }
  }

  handleUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  getLoginError = (email, password) => {
    if (!email) {
      if (!password) {
        return ERRORS.emptyFields;
      }
      return ERRORS.emptyEmail;
    } else if (!password) {
      return ERRORS.emptyPassword;
    }
    return null;
  }

  async handleSubmit() {
    let result = false;
    // event.preventDefault();
    const { email, password, signUp } = this.state;

    // Error Checking
    const error = this.getLoginError(email, password);

    // update error
    this.setState({ error });
    if (error) {
      return false;
    }

    //Make text fields non-selectable while request is being sent
    this.setState({ selectable: false });

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(
            email: $email,
            password: $password
          ) {
            userId
            token
            tokenExpiration
            email
          }
        }
      `
    };

    if (signUp) {
      requestBody = {
        query: `
          mutation SignUp($email: String!, $password: String!) {
            createUser(userInput: {
              email: $email,
              password: $password
            }) {
              userId
              email
              token
              tokenExpiration
            }
          }
        `
      };
    }
    requestBody.variables = { email, password };

    const action = (signUp) ? "Sign Up" : "Log In";
    console.log("Preparing " + action + " Server Request >> Request Body Complete.");
    result = await fetch('https://graphql-event-booking.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(res.status !== 200 && res.status !== 201) {
        this.setState({ error: ERRORS.loginFail });
        console.log("Server Output >> " + action + " Request Failed")
        if (signUp) {
          this.setState({ error: ERRORS.signUpFail });
        }
        throw new Error('Failed!');
      }
      return res.json();
    }).then(resData => { // successful login or sign up
      console.log("Server Output >> " + action + " Successful");
      console.log("Server Output >> ");
      console.log(resData.data);


      if (resData.data.login) {
        const { token, userId, tokenExpiration, email } = resData.data.login;
        return { token, userId, tokenExpiration, email };
        //delay(() => this.context.login(token, userId, tokenExpiration, email), 0);
      } else if (resData.data.createUser) {
        this.setState({ result: true });
        const { token, userId, tokenExpiration, email } = resData.data.createUser;
        return { token, userId, tokenExpiration, email };
        //delay(() => this.context.login(token, userId, tokenExpiration, email), 0);
      }
    }).catch(err => {
      console.log(err);
    });
    this.setState({ selectable: true });
    console.log("FETCHED RESULT >> " + result);
    return result;
  }

  switchForm() {
    const { signUp } = this.props;
    this.setState({
      ...this.state,
      signUp: !signUp,
    });
    if (!signUp) {
      navigate(`/app/sign-up`);
    } else {
      navigate(`/app/login`);
    }
  }

  render() {
    const { email, password, selectable, error } = this.state;
    return (
      <View title={(this.props.signUp) ? 'Sign Up' : 'Log In'}>
        <Form
          handleUpdate={e => this.handleUpdate(e)}
          handleSubmit={e => this.handleSubmit(e)}
          signUp={this.props.signUp}
          switchForm={e => this.switchForm(e)}
          email={email}
          password={password}
          selectable={selectable}
          error={error}
          resultLabel={((error) && "Oops!") || ((this.props.signUp) ? SUCCESS_LABEL.signUp : SUCCESS_LABEL.login)}
          loadingLabel={(this.props.signUp) ? LOADING_LABEL.signUp : LOADING_LABEL.login}
          contextLogin={this.context.login}
        />
      </View>
    );
  }
}

Login.propTypes = {
  signUp: PropTypes.bool,
}

export default Login;

import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import Form from './Form';
import View from './View';
import AuthContext from '../context/auth-context';

const ERRORS = {
  auth: "Authentication Failed",
  emptyEmail: "Email field is empty",
  emptyPassword: "Password field is empty",
  emptyFields: "Enter a valid email and password combination",
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

  getError = (email, password) => {
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

  handleSubmit(event) {
    event.preventDefault();
    const { email, password, signUp } = this.state;

    // Error Checking
    const error = this.getError(email, password);

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
              _id
              email
            }
          }
        `
      };
    }
    requestBody.variables = { email, password };

    const action = (signUp) ? "Sign Up" : "Log In";
    console.log("Preparing " + action + " Server Request >> Request Body Complete.");
    fetch('https://graphql-event-booking.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(res.status !== 200 && res.status !== 201) {
        console.log("Server Output >> " + action + " Request Failed")
        throw new Error('Failed!');
      }
      return res.json();
    }).then(resData => { // successful login or sign up
      if (signUp && !resData.data.createUser) {
        console.log("Server Output >> " + action + " Failed");
        console.log("Server Output >> " + "Account already exists")
        return false;
      }
      console.log("Server Output >> " + action + " Successful");
      console.log("Server Output >> ");
      console.log(resData.data);


      if (resData.data.login) {
        const { token, userId, tokenExpiration, email } = resData.data.login;
        this.context.login(token, userId, tokenExpiration, email);
      } else if (resData.data.createUser) {
        this.setState({
          email: '',
          password: '',
        });
      }

    }).catch(err => {
      console.log(err);
    });
    this.setState({ selectable: true });
    return true;
  }

  switchForm(event) {
    event.preventDefault();
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
        />
      </View>
    );
  }
}

Login.propTypes = {
  signUp: PropTypes.bool,
}

export default Login;

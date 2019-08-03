import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import Form from './Form';
import View from './View';
import AuthContext from '../context/auth-context';

/*const errors = {
  auth: "Username or password is invalid",
  username: "The username field is empty",
  password: "The password field is empty",
}*/

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ``,
      password: ``,
      signUp: props.signUp,
      error: null,
    }
  }


  static contextType = AuthContext;

  handleUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password, signUp } = this.state;

    if (!email || !password) {
      //this.setState({ error: })
      return false;
    }
    if (email.trim().length === 0 || password.trim().length === 0) {
      return false;
    }

    let requestBody = {
      query: `
        query Login {
          login(
            email: "${email}",
            password: "${password}"
          ) {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (signUp) {
      requestBody = {
        query: `
          mutation SignUp {
            createUser(userInput: {
              email: "${email}",
              password: "${password}"
            }) {
              _id
              email
            }
          }
        `
      };
    }
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
      console.log("Server Output >> " + action + " Successful");
      console.log("Server Output >> ");
      console.log(resData.data);


      if (resData.data.login) {
        this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration);
      } else if (resData.data.createUser) {
        //
      }

    }).catch(err => {
      console.log(err);
    });
    return false;
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
    return (
      <View title={(this.props.signUp) ? 'Sign Up' : 'Log In'}>
        <Form
          handleUpdate={e => this.handleUpdate(e)}
          handleSubmit={e => this.handleSubmit(e)}
          signUp={this.props.signUp}
          switchForm={e => this.switchForm(e)}
        />
      </View>
    );
  }
}

Login.propTypes = {
  signUp: PropTypes.bool,
}

export default Login;

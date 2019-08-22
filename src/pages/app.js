import React from 'react';
import { Router, Redirect } from '@reach/router';

import Layout from '../components/Layout';
import Login from '../components/Login';
import PrivateRoute from '../components/PrivateRoute';

import Home from '../components/Home';
import Events from '../components/Events';
import Bookings from '../components/Bookings';
import Status from '../components/Status';
import AuthContext from '../context/auth-context';
import { isLoggedIn, onLoginSuccess } from '../utils/auth.js';

class App extends React.Component {
  state = {
    token: null,
    userId: null,
    email: null,
    tokenExpiration: null,
  }

  componentDidMount() {
    const { token, userId, email } = isLoggedIn();
    this.setState({ token, userId, email });
  }

  login = (token, userId, tokenExpiration, email) => {
    this.setState({ token, userId, tokenExpiration, email });
    onLoginSuccess(token, userId, tokenExpiration, email);
  }

  logout = () => {
    this.setState({ token: null, userId: null, email: null, tokenExpiration: null });
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          token: this.state.token,
          userId: this.state.userId,
          email: this.state.email,
          login: this.login,
          logout: this.logout,
        }}
      >
        <Layout>
          <Status />
          <Router>
            {this.state.token && <Redirect from="/app/login" to="/app/events" exact noThrow />}
            {this.state.token && <Redirect from="/app/sign-up" to="/app/events" exact noThrow />}

            <PrivateRoute path="/app/bookings" component={Bookings} />
            <Events path="/app/events" />
            <Login signUp={false} path="/app/login" />
            <Login signUp path="/app/sign-up" />
            <Home path="/" exact />
          </Router>
        </Layout>
      </AuthContext.Provider>
    );
  }
}

export default App;

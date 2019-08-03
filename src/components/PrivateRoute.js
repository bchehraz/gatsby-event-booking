import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import AuthContext from '../context/auth-context';

class PrivateRoute extends React.Component {
  static contextType = AuthContext;

  render() {
    const {
      component: Component,
      location: pathname,
      ...rest
    } = this.props;


    //if on the sign up page, stay
    // if on the login page, stay
    // if anywhere but login or sign up, go to login
    if (!this.context.token) {
      if (pathname !== `/app/login` && pathname !== `/app/sign-up`) {
        //if you're not on sign up or login page,
        navigate(`/app/login`);
      }
      return null;
    }

    return <Component {...rest} />
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.object,
  pathname: PropTypes.objectOf(PropTypes.string.isRequired),
}

export default PrivateRoute;

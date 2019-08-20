import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import AuthContext from '../context/auth-context';
import { isLoggedIn } from '../utils/auth';

class PrivateRoute extends React.Component {
  static contextType = AuthContext;

  render() {
    const {
      component: Component,
      location: pathname,
      ...rest
    } = this.props;

    if (!isLoggedIn()) {
      if (pathname !== `/app/login`) {
        //if you're not on sign up or login page,
        navigate(`/app/login`);
      }
      return null;
    }

    //if on the sign up page, stay
    // if on the login page, stay
    // if anywhere but login or sign up, go to login
    return <Component {...rest} />
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.object,
  pathname: PropTypes.objectOf(PropTypes.string.isRequired),
}

export default PrivateRoute;

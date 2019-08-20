import React from 'react';
import { Link } from 'gatsby';
import styles from './status.module.css';
import AuthContext from '../../context/auth-context';
import { logout } from '../../utils/auth.js';

const Status = () => {
  return (
    <AuthContext.Consumer>
      {context => (
        <div className={styles.status}>
          {context.token && (
            <p className={styles[`status__text`]}>
              Logged in as {context.userId}!
              {` `}
              <Link
                to="/"
                onClick={event => {
                  event.preventDefault();
                  logout(() => context.logout());
                }}
              >
                log out
              </Link>
            </p>
          )}
          {!context.token && (
            <p className={styles[`status__text`]}>
              To get the full app experience, you’ll need to
              {` `}

              <Link to="/app/login">log in</Link>.
            </p>
          )}
        </div>
      )}
    </AuthContext.Consumer>
  )
}

export default Status;

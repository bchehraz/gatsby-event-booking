import React from 'react';
import { navigate } from '@reach/router';
import styles from './status.module.css';
import AuthContext from '../../context/auth-context';

const Status = () => {
  return (
    <AuthContext.Consumer>
      {context => (
        <div className={styles.status}>
          {context.token && (
            <p className={styles[`status__text`]}>
              Logged in as {context.userId}!
              {` `}
              <a
                href="/"
                onClick={event => {
                  event.preventDefault();
                  context.logout();
                }}
              >
                log out
              </a>
            </p>
          )}
          {!context.token && (
            <p className={styles[`status__text`]}>
              To get the full app experience, you’ll need to
              {` `}
              <a href="/" onClick={event => {
                event.preventDefault();
                navigate('/app/login');
              }}>log in</a>.
            </p>
          )}
        </div>
      )}
    </AuthContext.Consumer>
  )
}

export default Status;

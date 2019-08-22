import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AwesomeButtonProgress, AwesomeButton } from 'react-awesome-button';

import styles from './form.module.css';
import './button-theme-custom.css';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;

const Column = styled.div`
  width: 50%;
  padding: 5px 0;

  :nth-child(2) {
    text-align: right;
  }
`;

class Form extends React.Component {
  state = {
    triggerButtonPress: false,
  }

  render() {
    const {
      handleSubmit,
      handleUpdate,
      signUp,
      switchForm,
      email,
      password,
      selectable,
      error,
      resultLabel,
      loadingLabel,
      contextLogin
    } = this.props;
    return (
      <Container>
        <Column>
          <form
            className={styles.form}
            method="post"
            onSubmit={event => {
              this.setState({ triggerButtonPress: true });
              event.preventDefault();
            }}
            style={{ margin: '0 auto' }}
          >
            <label className={styles[`form__label`]}>
              Email
              <input
                className={styles[`form__input`]}
                type="text"
                name="email"
                onChange={handleUpdate}
                value={email}
                disabled={!selectable}
                autoComplete="email"
              />
            </label>
            <label className={styles[`form__label`]}>
              Password
              <input
                className={styles[`form__input`]}
                type="password"
                name="password"
                onChange={handleUpdate}
                value={password}
                disabled={!selectable}
              />
              {(error) && <p style={{ textAlign: 'left', color: 'red', maxWidth: '200px', padding: '5px', margin: 0 }}>{error}</p>}
            </label>

            <AwesomeButtonProgress
              type="primary"
              resultLabel={resultLabel}
              loadingLabel={loadingLabel}
              releaseDelay={1000}
              fakePress={this.state.triggerButtonPress}
              style={{ width: '100%', maxWidth: '200px', marginTop: '10px' }}
              action={async (element, next) => {
                let result = false;
                await handleSubmit().then((response) => result = response);
                console.log("ACTION RESULT => " + result.email);

                this.setState({ triggerButtonPress: false });
                next(result);

                if (result) {
                  window.setTimeout(() => contextLogin(result.token, result.userId, result.tokenExpiration, result.email), 2000);
                }
              }}
            >
            {/*action={async (element, next) => {
              let result = false;
              await handleSubmit().then((response) => result = response);

              window.setTimeout(() => {
                next(result);
              }, 250);

              window.setTimeout(() => {
                if (result) {
                  window.setTimeout(() => {
                  }, 1000);
                }
              }, 0);
              this.setState({ triggerButtonPress: false });
            }}*/}
              {(signUp) ? 'Create Account' : 'Log In'}
            </AwesomeButtonProgress>
          </form>
        </Column>
        <Column>
          <div>
            {(signUp) ? "Already a member? " : "Not yet a member? "}
          </div>

          <div style={{ margin: 0, padding: 0 }}>
            <AwesomeButton
              type="primary"
              style={{ width: '100%', maxWidth: '100px', marginTop: '10px' }}
              action={switchForm}
            >
              {(signUp) ? 'Login' : `Sign Up`}
            </AwesomeButton>
          </div>
        </Column>
      </Container>
    );
  }
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  signUp: PropTypes.bool.isRequired,
  switchForm: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  selectable: PropTypes.bool.isRequired,
  error: PropTypes.string,
  resultLabel: PropTypes.string.isRequired,
  loadingLabel: PropTypes.string.isRequired,
}

export default Form;

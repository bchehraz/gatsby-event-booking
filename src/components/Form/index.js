import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Spinner from '../Spinner/';
import styles from './form.module.css';

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

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 0px;

  input {
    width: 100%;
    max-width: 200px;
  }
`;

const Form = ({
  handleSubmit,
  handleUpdate,
  signUp,
  switchForm,
  email,
  password,
  selectable,
  error,
  loading,
  success,
}) => (
  <Container>
    <Column>
      <form
        className={styles.form}
        method="post"
        onSubmit={event => {
          handleSubmit(event);
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
        </label>

        <SubmitContainer>
          <input
            type="submit"
            className={styles[`form__button`]}
            value={(signUp) ? 'Sign Up' : 'Log In'}
          />
          <div style={{ width: '100%', maxWidth: '200px' }}>
            {loading && <Spinner style={{ margin: '0 auto' }} />}
            {(error && !loading) && <p style={{ textAlign: 'center', color: 'red', maxWidth: '200px', padding: 10, margin: 0 }}>{error}</p>}
            {(success && <p style={{ textAlign: 'center', color: 'green', maxWidth: '200px', padding: 10, margin: 0 }}>{(signUp) ? "Done! Logging in..." : "Authenticated!"}</p>)}
          </div>
        </SubmitContainer>
      </form>
    </Column>
    <Column>
      <div>
        {(signUp) ? "Already a member? " : "Not yet a member? "}
      </div>

      <div style={{ margin: 0, padding: 0 }}>
        <button
          className={styles[`form__button`]}
          onClick={switchForm}
        >
          {(signUp) ? 'Login' : `Sign Up`}
        </button>
      </div>
    </Column>
  </Container>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  signUp: PropTypes.bool.isRequired,
  switchForm: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  selectable: PropTypes.bool.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
}

export default Form;

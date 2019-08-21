import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from './form.module.css';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;

const Column = styled.div`
  width: 50%;
  padding: 5px;

  :nth-child(2) {
    text-align: right;
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
          { (error) && <p style={{ textAlign: 'center', color: 'red', maxWidth: '200px' }}>{error}</p> }
        </label>

        <input
          className={styles[`form__button`]}
          type="submit"
          value={(signUp) ? 'Create Account' : 'Log In'}
        />
      </form>
    </Column>
    <Column>
      <div>
        {(signUp) ? "Already a member? " : "Not yet a member? "}
      </div>

      <div style={{ margin: 0, padding: 0 }}>
        <button
          className={styles[`form__button`]}
          type="submit"
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
}

export default Form;

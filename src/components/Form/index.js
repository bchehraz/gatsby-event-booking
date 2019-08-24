import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Spinner from '../Spinner/';
import styles from './form.module.css';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-start;

  @media only screen and (min-width: 500px) {
    flex-flow: row nowrap;
    align-items: flex-end;
    justify-content: center;
  }
`;

const Column = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  max-width: 300px;

  :nth-child(2) {
    max-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;

    div {
      padding: 2.5rem;
    }
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 0 0;
`;

const ResponseMessage = styled.div`
  width: 100%;
  text-align: center;

  .success, .error {
    color: white;
    background-color: #39ce6b;
    width: 100%;
    margin: 10px auto 0;
    padding: 10px;
  }

  .error {
    color: white;
    background-color: #d84e4e;
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
  response
}) => (
  <Container>
    <Column>
      <form
        className={styles.form}
        method="post"
        onSubmit={event => {
          handleSubmit(event);
        }}
      >
        <label className={styles[`form__label`]}>
          Email
          <input
            className={styles[`form__input`]}
            type="email"
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
          <ResponseMessage>
            {response}
          </ResponseMessage>
        </SubmitContainer>
      </form>
    </Column>
    <Column>
      <div>
        {(signUp) ? "Already a member? " : "Still not a member? "}
      </div>

      <button
        className={styles[`form__button`]}
        onClick={switchForm}
      >
        {(signUp) ? 'Login' : `Sign Up`}
      </button>
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
  response: PropTypes.object,
}

export default Form;

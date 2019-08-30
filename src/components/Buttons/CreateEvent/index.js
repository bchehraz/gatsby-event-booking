import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaPlusCircle as FaPlus } from 'react-icons/fa';

import formStyles from '../../Form/form.module.css';

const CreateEventContainer = styled.div`
  button {
    background-color: #663399;
    padding: 1.5rem 0;
    margin: 0;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
  }
`;

const CreateEventButton = ({ buttonText, onClick }) => (
  <CreateEventContainer>
    <button
      className={formStyles[`form__button`]}
      onClick={onClick}
    >
      <FaPlus size={30} style={{ marginRight: '1rem' }}/>
      {buttonText}
    </button>
  </CreateEventContainer>
);

CreateEventButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default CreateEventButton;

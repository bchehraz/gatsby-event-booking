import React from 'react';
import PropTypes from 'prop-types';
import styles from './backdrop.module.css';

const BackDrop = ({ onClick }) => (
  <div className={styles[`backdrop`]} onClick={onClick}>
  </div>
);

BackDrop.propTypes = {
  onClick: PropTypes.func,
}

export default BackDrop;

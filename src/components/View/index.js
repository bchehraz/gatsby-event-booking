import React from 'react';
import PropTypes from 'prop-types';
import styles from './view.module.css';

const View = ({ title, children, style }) => (
  <section className={styles.view} style={style}>
    <h1 className={styles[`view__heading`]}>{title}</h1>
    {children}
  </section>
);

View.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
  style: PropTypes.object,
}

export default View;

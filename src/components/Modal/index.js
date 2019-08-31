import React from 'react';
import PropTypes from 'prop-types';
import View from '../View';
import formStyles from '../Form/form.module.css';
import styles from './modal.module.css';

const Modal = props => (
  <div className={styles[`modal`]}>
    <section className={styles[`modal__content`]}>
      <h2>New Event</h2>
      {props.children}
    </section>
    <section className={styles[`modal__actions`]}>
      {props.canConfirm && <button className={formStyles[`form__button`]} onClick={props.onConfirm}>{props.confirmText}</button>}
      {props.canCancel && <button className={formStyles[`form__button`]} style={{ background: '#a2002d' }} onClick={props.onCancel}>Cancel</button>}
    </section>
  </div>
);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  canCancel: PropTypes.bool.isRequired,
  canConfirm: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmText: PropTypes.string.isRequired,
}

export default Modal;

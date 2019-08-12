import React from 'react';
import PropTypes from 'prop-types';
import View from '../View';
import formStyles from '../Form/form.module.css';
import styles from './modal.module.css';
// import CreateEventForm from '../CreateEventForm';

const Modal = props => (
  <div className={styles[`modal`]}>
    <View title={props.title}>
      <section className={styles[`modal__content`]}>
        {props.children}
      </section>
      <section className={styles[`modal__actions`]}>
        {props.canCancel && <button className={formStyles[`form__button`]} onClick={props.onCancel}>Cancel</button>}
        {props.canConfirm && <button className={formStyles[`form__button`]} onClick={props.onConfirm}>{props.confirmText}</button>}
      </section>
    </View>
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

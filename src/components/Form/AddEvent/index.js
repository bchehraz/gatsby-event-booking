import React from 'react';
import PropTypes from 'prop-types';

import formStyles from '../../Form/form.module.css';

const AddEventForm = ({ onChange }) => (
  <form className={formStyles.form}>
    <label className={formStyles[`form__label`]}>
      Title
      <input
        className={formStyles[`form__input`]}
        type="text"
        name="title"
        onChange={onChange}
      />
    </label>
    <label className={formStyles[`form__label`]}>
      Price
      <input
        className={formStyles[`form__input`]}
        type="number"
        name="price"
        onChange={onChange}
        min="0"
      />
    </label>
    <label className={formStyles[`form__label`]}>
      Date
      <input
        className={formStyles[`form__input`]}
        type="datetime-local"
        name="date"
        onChange={onChange}
      />
    </label>
    <label className={formStyles[`form__label`]}>
      Description
      <textarea
        className={formStyles[`form__textarea`]}
        rows={4}
        name="description"
        onChange={onChange}
      />
    </label>
  </form>
);

AddEventForm.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default AddEventForm;

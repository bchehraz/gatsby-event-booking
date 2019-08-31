import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import formStyles from '../../Form/form.module.css';

const AddEventForm = ({ onChange, onDateChange, startDate, endDate }) => (
  <form className={formStyles.form}>
    <label className={formStyles[`form__label`]}>
      Event Name
      <input
        className={formStyles[`form__input`]}
        type="text"
        name="title"
        onChange={onChange}
      />
    </label>
    <label className={formStyles[`form__label`]}>
      $ Cost
      <input
        className={formStyles[`form__input`]}
        type="number"
        name="price"
        onChange={onChange}
        min="0"
      />
    </label>
    <label className={formStyles[`form__label`]}>
      When is it?
      <DatePicker
        selected={endDate}
        onChange={onDateChange}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={startDate}
      />
    </label>
    <label className={formStyles[`form__label`]}>
      Tell us more about it
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
  onDateChange: PropTypes.func.isRequired,
}

export default AddEventForm;

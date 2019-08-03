import React from 'react';

const CreateEventForm = () => {
  <form>
    <label className={styles[`form__label`]}>
      Password
      <input
        className={styles[`form__input`]}
        type="password"
        name="password"
        onChange={handleUpdate}
      />
    </label>
  </form>
}

export default CreateEventForm;

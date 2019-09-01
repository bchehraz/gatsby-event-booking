import React from 'react';
import PropTypes from 'prop-types';
import styles from './spinner.module.css';

const Spinner = (props) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto',
      ...props.style
    }}
  >
      <div style={{ width: '100%', height: '100%' }} className={styles[`lds__wedges`]}>
        <div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
  </div>
);

Spinner.propTypes = {
  style: PropTypes.func,
}

export default Spinner;

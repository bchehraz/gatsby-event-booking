import React from 'react';
import styles from './spinner.module.css';

const Spinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
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
)

export default Spinner;

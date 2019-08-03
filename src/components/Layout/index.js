import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Header from '../Header';

// Global styles and component-specific styles.
import './global.css';
import styles from './main.module.css';

const Layout = ({ children }) => (
  <div>
    <Helmet title="Events/Booking with Auth + Gatsby + GraphQL Server + MongoDB" />
    <Header />
    <main className={styles.main}>{children}</main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.any,
}

export default Layout;

import React from "react";

// import App from './app.js';
import Home from '../components/Home';
import Layout from '../components/Layout';
import Status from '../components/Status';

const IndexPage = () => (
  // <App />
  <Layout>
    <Status />
    <Home />
  </Layout>
);

export default IndexPage;

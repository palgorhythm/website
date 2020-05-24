import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
  <Layout>
    <SEO title='404: Not found' />
    <h1>😱 not found 😱</h1>
    <p>can't find a page with this url, sorry friendo 😭</p>
  </Layout>
);

export default NotFoundPage;

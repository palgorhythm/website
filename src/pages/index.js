import React from 'react';

import Layout from '../components/Layout';
import Body from '../components/Body';
import Seo from '../components/Seo';

const IndexPage = () => (
  <Layout>
    <Seo title='Home' />
    <Body />
  </Layout>
);

export default IndexPage;

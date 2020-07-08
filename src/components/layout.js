/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './GlobalStyle';
import Footer from './Footer';

import Header from './Header';

const PageStyle = styled.div`
  background: ${(props) => props.theme.lightPurple};
  margin: 0;
  padding: 1rem;
  height: 100vh;
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageStyle>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
        <Footer></Footer>
      </PageStyle>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

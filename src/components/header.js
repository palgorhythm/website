import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import StyledLink from './StyledLink';
const HeaderStyle = styled.header`
  background: ${(props) => props.theme.red};
  font-weight: 100;
  margin: 0;
  display: flex;
  justify-content: center;
  padding: 1rem;
  border-radius: 1rem;
`;

const Header = ({ siteTitle }) => (
  <HeaderStyle>
    <h1>
      <StyledLink to='/'>{siteTitle}</StyledLink>
    </h1>
  </HeaderStyle>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

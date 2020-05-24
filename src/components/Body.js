import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Image from './Image';

const BodyStyle = styled.div`
  background: ${(props) => props.theme.green};
  padding: 1.25rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-content: center;
`;

const BodyTextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
`;

const Body = () => (
  <BodyStyle>
    <div style={{ minWidth: `20vw`, maxWidth: `300px` }}>
      <Image imageName='profilePic' />
    </div>
    <BodyTextArea>
      <h1>🐥 hi 🐥</h1>
      <p>welcome to my website !</p>
      <Link to='/work/'>view work</Link>
    </BodyTextArea>
  </BodyStyle>
);

export default Body;

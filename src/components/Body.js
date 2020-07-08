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
      <Link to='/work/'></Link>
      <Link to='https://batterydrums.bandcamp.com/'>BATTERY</Link>
      <Link to='https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=3IfQywgjSCyOWKFYHvxojQ'>spotify discography</Link>
      <Link to='https://github.com/palgorhythm'>github</Link>
      <Link to='https://linkedin.com/in/palgorhythm'>linkedin</Link>
      <Link to='https://www.youtube.com/channel/UCO6KYK2RJU7ARxsLhutzeng'>youtube</Link>
      <Link to='https://www.tiktok.com/@__battery'>tiktok</Link>

    </BodyTextArea>
  </BodyStyle>
);

export default Body;

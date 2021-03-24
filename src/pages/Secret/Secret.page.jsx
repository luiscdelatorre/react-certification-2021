import React from 'react';
import { IoArrowUndo } from 'react-icons/io5';
import VideoPlayer from '../../components/VideoPlayer';
import { useSessionData } from '../../providers/SessionData/SessionData.provider';
import Styled from './Secret.styles';

function SecretPage() {
  const { state } = useSessionData();
  const videoId = 'dQw4w9WgXcQ';
  return (
    <Styled.Container>
      <Styled.Title>Welcome {state.user?.name}</Styled.Title>
      <VideoPlayer videoId={videoId} autoplay />
      <Styled.ButtonLink to="/">
        <IoArrowUndo />
        Back to Home
      </Styled.ButtonLink>
    </Styled.Container>
  );
}

export default SecretPage;

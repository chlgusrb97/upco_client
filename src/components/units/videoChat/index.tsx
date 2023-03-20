import { useState } from "react";
import * as S from "./styles";

export default function VideoChat(): JSX.Element {
  const [isVolume, setIsVolume] = useState(false);
  const [isMic, setIsMic] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  const onClickVolume = (): void => {
    setIsVolume((prev) => !prev);
  };

  const onClickMic = (): void => {
    setIsMic((prev) => !prev);
  };

  const onClickVideo = (): void => {
    setIsVideo((prev) => !prev);
  };

  return (
    <>
      <S.Wrapper>
        <S.OpponentVideo></S.OpponentVideo>
        <S.Myvideo></S.Myvideo>
        <S.IconBox>
          <li onClick={onClickVolume}>{isVolume ? <S.VolumeOn /> : <S.VolumeOff />}</li>
          <li onClick={onClickMic}>{isMic ? <S.MicOn /> : <S.MicOff />}</li>
          <li onClick={onClickVideo}>{isVideo ? <S.VideoOn /> : <S.VideoOff />}</li>
        </S.IconBox>
      </S.Wrapper>
    </>
  );
}
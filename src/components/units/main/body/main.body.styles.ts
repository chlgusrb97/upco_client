import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import { Map } from "react-kakao-maps-sdk";

export const CustomMarker = styled(FaMapMarkerAlt)`
  color: #29a2c6;
  font-size: 40px;
`;

export const CustomMyMarker = styled(FaUserAlt)`
  color: #29a2c6;
  font-size: 40px;
`;

export const MyMarkerBox = styled.div`
  width: 100px;
  height: 100px;
`;

export const MyMarker = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

export const MabBox = styled.div`
  width: calc(100% - 300px);
  height: calc(100vh - 68px);
  background-color: #e2e2e2;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const MabWeb = styled(Map)`
  width: calc(100% - 300px);
  height: calc(100vh - 68px);

  ${css`
    @media (max-width: 468px) {
      width: 100%;
      height: 100vh;
      z-index: 1;
    }
  `}
`;

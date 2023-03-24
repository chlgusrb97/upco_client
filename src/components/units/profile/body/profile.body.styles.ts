import styled from "@emotion/styled";
import { FiEdit } from "react-icons/fi";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 150px;
  border-radius: 6px;
  margin-top: 50px;
  padding: 20px;
  border: 1px solid #d3d3d3;
`;

export const ProfileLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > ul {
    display: flex;
    flex-direction: column;

    > li {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;

export const UserIconBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #d1d1d1;
  margin-right: 30px;

  > img {
    border-radius: 50px;
    width: 100%;
    height: 100%;
  }
`;

export const Name = styled.h4`
  font-size: 18px;
  margin-right: 5px;
`;

export const Age = styled.p`
  font-size: 14px;
  color: #979797;
`;

export const Email = styled.p`
  font-size: 14px;
  color: #979797;
  margin-bottom: 15px;
`;

export const Interest = styled.p`
  font-size: 14px;
  padding: 3px 18px;
  background-color: #6658ca;
  color: #fff;
  border-radius: 100px;
  margin-right: 5px;
`;

export const ProfileRight = styled.div`
  div {
    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #979797;
      font-size: 14px;
      text-decoration: underline;
      transition: all 0.3s ease-in-out;

      :hover {
        color: #191919;
      }
    }
  }
`;

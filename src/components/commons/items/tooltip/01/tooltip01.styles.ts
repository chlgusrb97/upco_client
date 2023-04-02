import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 106px;
  top: 35px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #e2e2e2;
`;

export const RoomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: center;  */
  align-items: center;
  width: 100%;
  height: 33%;
  padding: 10px;

  div {
    margin-left: 5px;
    color: #979797;
    :hover {
      color: #6658ca;
    }
  }
`;

export const divideLine = styled.div`
  border-bottom: 1px solid #e2e2e2;
`;

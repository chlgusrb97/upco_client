import styled from "@emotion/styled";

export const Input = styled.input`
  width: 100%;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 50px;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;

  ::placeholder {
    color: #ccc;
    font-size: 12px;
  }
  :focus {
    border-color: #b1b2ff;
  }
`;

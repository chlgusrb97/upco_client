import { useMutation, gql } from "@apollo/client";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const useMutationUploadFile = () => {
  const result = useMutation(UPLOAD_FILE);
  return result;
};

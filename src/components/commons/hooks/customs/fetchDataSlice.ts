import { maybe } from "@apollo/client/utilities";
import { Maybe } from "yup";
import { INotice, IQuestion } from "../../../../commons/types/generated/types";

interface IFetchDataSlice {
  length: number;
  slice: any;
  fetchNotices?: Maybe<INotice[]> | undefined;
}

export const FetchDataSlice = (data: IFetchDataSlice) => () => {
  const result = [];

  if (data === undefined) {
    return;
  }
  for (let i = 0; i < data?.length; i = i + 10) {
    result.push(data.slice(i, i + 10));
  }
  return result;
};

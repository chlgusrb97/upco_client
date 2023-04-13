import * as S from "./main.footer.styles";
import FollowerList from "../../../list/followerList";
import LocationList from "../../../list/locationList";
import { isFollowerState, selectedComponentState } from "../../../commons/stores";
import { useRecoilState } from "recoil";
import { useQueryFetchFriendRequests } from "../../../commons/hooks/queries/useQueryFetchFriendRequests";
import { useOnClickAcceptFriendRequest } from "../../../commons/hooks/customs/useOnClickAcceptFriendRequest";
import { useOnClickRejectFriendRequest } from "../../../commons/hooks/customs/useOnClickRejectFriendRequest";
import { IProps } from "./main.footer.types";
import { mainFooterMode } from "../../../commons/hooks/customs/mainFooterMode";
import { useRouter } from "next/router";

const MPAGE = ["/main"];

export default function MainFooter(props: IProps): JSX.Element {
  const [selectedComponent] = useRecoilState(selectedComponentState); // 사이드 바 목록 교체
  const [isFollower] = useRecoilState(isFollowerState); // 친구 요청 목록

  const router = useRouter();
  const mPage = MPAGE.includes(router.asPath);

  const { data } = useQueryFetchFriendRequests(); // 친구 요청 목록
  const { onClickAcceptFriendRequest } = useOnClickAcceptFriendRequest();
  const { onClickRejectFriendRequest } = useOnClickRejectFriendRequest();
  const { handleChatClick, handleFollowerClick, followerOpen } = mainFooterMode();

  return (
    <S.Wrapper>
      <S.SubWrapper>
        <S.ChatFooterTitle>
          <S.ChatTitle selected={selectedComponent === "location"} onClick={handleChatClick}>
            내 주변
          </S.ChatTitle>
          <S.FollowerTitle
            selected={selectedComponent === "follower"}
            onClick={handleFollowerClick}
          >
            친구 목록
          </S.FollowerTitle>
        </S.ChatFooterTitle>

        {data?.fetchFriendRequests.length !== 0 && (
          <S.FollowList onClick={followerOpen} mPage={mPage}>
            친구 요청
          </S.FollowList>
        )}
      </S.SubWrapper>
      <S.DivideLine />
      {isFollower && (
        <S.FriendRequestListBox>
          {data?.fetchFriendRequests.map((el) => (
            <S.FriendRequestList key={el.id} id={el.id}>
              <li>
                <S.Imgbox>
                  {el.sender.image ? (
                    <img src={`https://storage.cloud.google.com/upco-bucket/${el.sender.image}`} />
                  ) : (
                    <S.UserIcon />
                  )}
                </S.Imgbox>
                <p>{el.sender.nickname}</p>
              </li>
              <li>
                <button onClick={onClickAcceptFriendRequest(el.id)}>수락</button>
                <button onClick={onClickRejectFriendRequest(el.id)}>거절</button>
              </li>
            </S.FriendRequestList>
          ))}
        </S.FriendRequestListBox>
      )}

      {selectedComponent === "location" ? (
        <LocationList result={props.result} data={props.data} />
      ) : (
        selectedComponent === "follower" && <FollowerList />
      )}
    </S.Wrapper>
  );
}

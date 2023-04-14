import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import MainSideBar from "../../../units/main/sidebar/main.sidebar.index";
import { movePageMode } from "../../hooks/customs/movePageMode";
import { useQueryFetchLoginUser } from "../../hooks/queries/fetchLoginUser";
import TooltipUI from "../../items/tooltip/01/tooltip01.index";
import { isOpenState } from "../../stores";
import * as S from "./header.styles";

const MAIN_PAGE = ["/main"];

export default function LayoutHeader(): JSX.Element {
  const router = useRouter();
  const [isTooltip, setIsTooltip] = useState(false);
  const { data } = useQueryFetchLoginUser();
  const { onClickMovePage } = movePageMode();
  const [windowSize, setWindowSize] = useState<number | undefined>();
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const [isSide, setIsSide] = useState(false);

  const onClickOpen = (): void => {
    setIsTooltip((prev) => !prev);
  };

  useEffect(() => {
    setWindowSize(1200);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", windowSizeSave);
    return () => {
      window.removeEventListener("resize", windowSizeSave);
    };
  }, []);

  const windowSizeSave = (): void => {
    setWindowSize(window.innerWidth);
  };

  const onClickIsOpen = (): void => {
    setIsOpen((prev) => !prev);
  };

  const onClickIsSide = (): void => {
    setIsSide((prev) => !prev);
  };

  const mainPage = MAIN_PAGE.includes(router.asPath);

  return (
    <>
      {isSide && mainPage && <MainSideBar onClickIsOpen={onClickIsSide} />}
      <S.Wrapper>
        <div>
          <S.Logo src="/images/layout/logo.svg" onClick={onClickMovePage("/main")} />
          {typeof windowSize !== "undefined" && windowSize >= 767 ? (
            <>
              <S.MenuBox>
                <Link href="/main">
                  <div className={router.pathname === "/main" ? "selected" : ""}>
                    <S.MapIcon />
                    <a>지도</a>
                  </div>
                </Link>
                <Link href="/chat">
                  <div className={router.pathname === "/chat" ? "selected" : ""}>
                    <S.MessageIcon />
                    <a>채팅</a>
                  </div>
                </Link>
              </S.MenuBox>
              <S.UserBox style={{ position: "relative" }}>
                {isTooltip && <TooltipUI />}

                {data?.fetchLoginUser.image ? (
                  <S.UserImg
                    src={`https://storage.cloud.google.com/upco-bucket/${data?.fetchLoginUser.image}`}
                    onClick={onClickOpen}
                  />
                ) : (
                  <S.UserIcon onClick={onClickOpen} />
                )}
              </S.UserBox>
            </>
          ) : (
            <S.UserBox style={{ position: "relative" }}>
              <S.UserIcon02 onClick={mainPage ? onClickIsSide : onClickIsOpen} />
            </S.UserBox>
          )}
        </div>
      </S.Wrapper>
    </>
  );
}

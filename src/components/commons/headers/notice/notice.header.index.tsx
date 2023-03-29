import { useRouter } from "next/router";
import { Fragment, MouseEvent } from "react";
import * as S from "./notice.header.styles";

const menuTitles = [
  { title: "고객센터", page: "/notice" },
  { title: "문의내역", page: "/questionList" },
];

export default function NoticeHeader(): JSX.Element {
  const router = useRouter();
  const onClickMenu = (event: MouseEvent<HTMLDivElement>): void => {
    void router.push(event.currentTarget.id);
  };

  const currentPath = router.pathname;

  return (
    <S.Wrapper>
      {menuTitles.map((el) => (
        <Fragment key={el.page}>
          <S.MenuTitle
            id={el.page}
            onClick={onClickMenu}
            style={{
              fontWeight: currentPath === el.page ? "bold" : "",
              color: currentPath === el.page ? "#6658CA" : "#979797",
            }}
          >
            {el.title}
          </S.MenuTitle>
        </Fragment>
      ))}
    </S.Wrapper>
  );
}

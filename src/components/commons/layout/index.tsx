import { debounce } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isOpenState } from "../stores";
import LayoutFooter from "./footer/footer.index";
import LayoutHeader from "./header/header.index";

interface ILayoutProps {
  children: JSX.Element;
}

const HIDDEN_LAYOUT = ["/passwordReset", "/"];
const HIDDEN_LAYOUT_02 = ["/main", "/chat"];

export default function Layout(props: ILayoutProps): JSX.Element {
  const [windowSize, setWindowSize] = useState("");
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);

  const router = useRouter();
  const isHiddenLayout = HIDDEN_LAYOUT.includes(router.asPath);
  const isHiddenLayout02 = HIDDEN_LAYOUT_02.includes(router.asPath);

  useEffect(() => {
    window.addEventListener("resize", windowSizeSave);
    return () => {
      window.removeEventListener("resize", windowSizeSave);
    };
  }, []);

  useEffect(() => {
    if (windowSize >= 767) {
      setIsOpen(false);
    }
  });

  const windowSizeSave = debounce(() => {
    setWindowSize(window.innerWidth);
  }, 500);

  return (
    <>
      {!isHiddenLayout && <LayoutHeader />}
      <div>{props.children}</div>
      {isHiddenLayout02 && typeof window !== "undefined" && windowSize <= 767 && <LayoutFooter />}
    </>
  );
}

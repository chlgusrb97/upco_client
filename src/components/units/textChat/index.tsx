import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import VideoChat from "../videoChat";
import TextChatBody from "./body/textChat.body.index";
import TextChatFooter from "./footer/textChat.footer.index";
import TextChatHeader from "./header/textChat.header.index";
import { useQueryFetchLoginUser } from "../../commons/hooks/queries/fetchLoginUser";
import { useRecoilState } from "recoil";
import { roomIdState } from "../../commons/stores";

const Wrapper = styled.div`
  max-width: 100%;
  height: calc(100vh - 68px);
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;

const LeftContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export default function TextChat(): JSX.Element {
  const [isVideo, setIsVideo] = useState(false);
  const [messages, setMessages] = useState<Array<{ contents: string; isSent: boolean }>>([]);
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  const [messageLog, setMessageLog] = useState<Array<{ contents: string; senderId: string }>>([]);

  const data = useQueryFetchLoginUser();
  const myId = data?.data?.fetchLoginUser.id;
  console.log(socket);
  useEffect(() => {
    const newSocket = io("http://10.34.232.105:4000/", {
      path: "/socket.io",
      transports: ["websocket"],
    });
    newSocket.on("client", (contents) => {
      setMessages((prevMessages) => [...prevMessages, { contents, isSent: false }]);
    });

    newSocket.on("roomCreateOrJoin", (roomId) => {
      setRoomId(roomId);
    });
    console.log(roomId);
    newSocket.emit("joinRoom", roomId);

    newSocket.on("load Message", (messageLog) => {
      setMessageLog(messageLog);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setMessages([]);
    };
  }, [roomId, setMessages, setMessageLog]);

  const emitData = (contents: string): void => {
    if (socket) {
      setMessages((prevMessages) => [...prevMessages, { contents, isSent: true }]);
      socket.emit("message", { roomId, contents, myId });
    }
  };

  const onClickVideo = (): void => {
    setIsVideo(true);
  };

  return (
    <>
      <Wrapper>
        <LeftContents>
          <div>
            <TextChatHeader
              isVideo={isVideo}
              messages={messages}
              messageLog={messageLog}
              myId={myId}
            />
            <TextChatBody emitData={emitData} onClickVideo={onClickVideo} messages={messages} />
          </div>
          {isVideo && <VideoChat />}
        </LeftContents>
        <TextChatFooter />
      </Wrapper>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import FriendMessage from "./FriendMessage";
import MyMessage from "./MyMessage";

function ChatBody(props) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      if (props.chats[props.currentChat].scroll == -1) {
        ref.current.scrollTo({
          top: ref.current.scrollHeight,
        });
      } else {
        ref.current.scrollTo({
          top: props.chats[props.currentChat].scroll,
        });
      }
    }
  }, [props.currentChat]);

  return (
    <div
      className="chat-body w-100 flex-grow-1 d-flex flex-column"
      ref={ref}
      onScroll={(event) => {
        if (ref.current) {
          props.chats[props.currentChat].scroll = ref.current.scrollTop;
          props.setChats({ ...props.chats });
        }
      }}
    >
      {props.chats[props.currentChat].messages.map((message, messageIndex) => {
        if (message.ownerId == props.userInformation._id) {
          const firstMessage = messageIndex == 0 || props.chats[props.currentChat].messages[messageIndex - 1].ownerId != message.ownerId;
          const lastMessage = messageIndex == props.chats[props.currentChat].messages.length - 1 || props.chats[props.currentChat].messages[messageIndex + 1].ownerId != message.ownerId;
          return <MyMessage key={messageIndex} messageIndex={messageIndex} message={message} isFirst={firstMessage} isLast={lastMessage} picture={props.userInformation.picture} />;
        } else {
          const firstMessage = messageIndex == 0 || props.chats[props.currentChat].messages[messageIndex - 1].ownerId != message.ownerId;
          const lastMessage = messageIndex == props.chats[props.currentChat].messages.length - 1 || props.chats[props.currentChat].messages[messageIndex + 1].ownerId != message.ownerId;
          return <FriendMessage key={messageIndex} messageIndex={messageIndex} message={message} isFirst={firstMessage} isLast={lastMessage} picture={props.chats[props.currentChat].friend.picture} />;
        }
      })}
    </div>
  );
}

export default ChatBody;

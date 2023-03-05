import { useState } from "react";
import ChatItem from "./ChatItem";
import FriendMessage from "./FriendMessage";
import MyMessage from "./MyMessage";
import $ from "jquery";

function Chat(props) {
  const [text, setText] = useState("");
  const [newChat, setNewChat] = useState(false);
  const [currentChat, setCurrentChat] = useState(-1);

  return (
    <div className="body vw-100 flex-grow-1 d-flex">
      {/* left side */}
      <div className="left-side d-flex flex-column">
        {newChat ? (
          <>
            <div
              className="start-new-chat flex-shrink-0 d-flex justify-content-center align-items-center"
              onClick={() => {
                setNewChat(false);
              }}
            >
              Back to Chat List
            </div>
            {props.chats.map((chat, chatIndex) => {
              if (chat.messages.length == 0 && props.userInformation.friends.includes(chat.friend._id))
                return (
                  <ChatItem
                    key={chatIndex}
                    index={chatIndex}
                    id={chat._id}
                    firstName={chat.friend.firstName}
                    lastName={chat.friend.lastName}
                    picture={chat.friend.picture}
                    lastMessage={"lorem sdlfkj sllkd ls"}
                    lastMessageDate={"23:23 AM"}
                    newMessageCount={chatIndex}
                    onClick={() => {
                      setCurrentChat(chatIndex);
                    }}
                  />
                );
            })}
          </>
        ) : (
          <>
            <div
              className="start-new-chat flex-shrink-0 d-flex justify-content-center align-items-center"
              onClick={() => {
                setNewChat(true);
              }}
            >
              Start Chatting With New Friend
            </div>
            {props.chats.map((chat, chatIndex) => {
              if (chat.messages.length)
                return (
                  <ChatItem
                    key={chatIndex}
                    index={chatIndex}
                    id={chat._id}
                    firstName={chat.friend.firstName}
                    lastName={chat.friend.lastName}
                    picture={chat.friend.picture}
                    lastMessage={chat.messages[chat.messages.length - 1].text}
                    lastMessageDate={"23:23 AM"}
                    newMessageCount={chatIndex}
                    onClick={() => {
                      setCurrentChat(chatIndex);
                    }}
                  />
                );
            })}
          </>
        )}
      </div>

      {/* middle side */}
      <div className="middle-side chat d-flex flex-column">
        {currentChat != -1 ? (
          <>
            <div className="chat-header w-100 d-flex">
              <div className="chat-header-photo h-100 w-0 flex-grow-1 d-flex align-items-center">
                <img src={props.chats[currentChat].friend.picture ? props.chats[currentChat].friend.picture : "/profile-photo.webp"} alt="" />
                <div className="d-flex flex-column justify-content-center">
                  <span>
                    {props.chats[currentChat].friend.firstName} {props.chats[currentChat].friend.lastName}
                  </span>
                  <span>@{props.chats[currentChat].friend.userName} . online</span>
                </div>
              </div>
              <div className="chat-header-icons h-100 w-0 flex-grow-1 d-flex justify-content-end align-items-center">
                <i className="fa-solid fa-magnifying-glass"></i>
                <i className="fa-solid fa-phone"></i>
                <i className="fa-solid fa-video"></i>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>
            <div className="chat-body w-100 flex-grow-1 d-flex flex-column">
              <FriendMessage />
              {/* <MyMessage /> */}
              {props.chats[currentChat].messages.map((message, messageIndex) => {
                return <MyMessage key={messageIndex} messageIndex={messageIndex} text={message.text} date={message.date} />;
              })}
            </div>
            <div className="chat-footer w-100 d-flex align-items-center">
              <div className="align-self-end d-flex justify-content-center align-items-center">
                <i className="fa-solid fa-paperclip"></i>
              </div>
              <textarea
                placeholder="Write a message ..."
                name="new-post-text"
                id="new-post-text"
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                  $("#new-post-text").on("input", function () {
                    this.style.height = 0;
                    this.style.height = Math.min((window.innerHeight * 3) / 10, this.scrollHeight) + "px";
                  });
                }}
              ></textarea>
              {text && (
                <div className="align-self-end d-flex justify-content-center align-items-center">
                  <i
                    className="fa-solid fa-paper-plane"
                    onClick={() => {
                      props.addMessage(text, props.chats[currentChat].friend._id, props.chats[currentChat]._id, currentChat);
                    }}
                  ></i>
                </div>
              )}
              <div className="align-self-end d-flex justify-content-center align-items-center">
                <i className="fa-regular fa-face-smile-wink"></i>
              </div>
              <div className="align-self-end d-flex justify-content-center align-items-center">
                <i className="fa-solid fa-microphone"></i>
              </div>
            </div>
          </>
        ) : (
          <div className="no-chat h-100 w-100 d-flex justify-content-center align-items-center"> Choose a Friend to Start Chatting </div>
        )}
      </div>

      {/* right side */}
      <div className="right-side"></div>
    </div>
  );
}

export default Chat;

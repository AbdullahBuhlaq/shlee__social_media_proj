import { useEffect, useRef, useState } from "react";
import ChatItem from "./ChatItem";
import ChatBody from "./ChatBody";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

function Chat(props) {
  const [text, setText] = useState("");
  const [newChat, setNewChat] = useState(false);
  const [currentChat, setCurrentChat] = useState(-1);
  const navigate = useNavigate();

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
              <i className="fa-solid fa-reply"></i> &nbsp; Back to Chat List
            </div>
            {Object.keys(props.chats).map((chatKey, chatIndex) => {
              if (props.chats[chatKey].messages.length == 0 && props.userInformation.friends.includes(props.chats[chatKey].friend._id))
                return (
                  <ChatItem
                    key={chatIndex}
                    index={chatIndex}
                    id={chatKey}
                    firstName={props.chats[chatKey].friend.firstName}
                    lastName={props.chats[chatKey].friend.lastName}
                    picture={props.chats[chatKey].friend.picture}
                    lastMessage={"Send First Message"}
                    lastMessageDate={""}
                    newMessageCount={0}
                    onClick={() => {
                      setCurrentChat(chatKey);
                    }}
                  />
                );
            })}
          </>
        ) : (
          <>
            {Object.keys(props.chats).map((chatKey, chatIndex) => {
              if (props.chats[chatKey].messages.length)
                return (
                  <ChatItem
                    key={chatIndex}
                    index={chatIndex}
                    id={chatKey}
                    firstName={props.chats[chatKey].friend.firstName}
                    lastName={props.chats[chatKey].friend.lastName}
                    picture={props.chats[chatKey].friend.picture}
                    lastMessage={props.chats[chatKey].messages[props.chats[chatKey].messages.length - 1].text}
                    lastMessageDate={props.chats[chatKey].messages[props.chats[chatKey].messages.length - 1].date}
                    newMessageCount={0}
                    onClick={() => {
                      setCurrentChat(chatKey);
                    }}
                  />
                );
            })}
            <div
              className="start-new-chat flex-shrink-0 d-flex justify-content-center align-items-center"
              onClick={() => {
                setNewChat(true);
              }}
            >
              <i className="fa-regular fa-comment"></i>&nbsp;Start New Chat
            </div>
          </>
        )}
      </div>

      {/* middle side */}
      <div className="middle-side chat d-flex flex-column">
        {currentChat != -1 ? (
          <>
            <div className="chat-header w-100 d-flex">
              <div className="chat-header-photo h-100 w-0 flex-grow-1 d-flex align-items-center">
                <img
                  className="cursor"
                  src={props.chats[currentChat].friend.picture ? props.chats[currentChat].friend.picture : "/profile-photo.webp"}
                  alt=""
                  onClick={() => {
                    navigate(`/profile/${props.chats[currentChat].friend._id}`);
                  }}
                />
                <div
                  className="d-flex flex-column justify-content-center cursor"
                  onClick={() => {
                    navigate(`/profile/${props.chats[currentChat].friend._id}`);
                  }}
                >
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
            <ChatBody currentChat={currentChat} chats={props.chats} setChats={props.setChats} userInformation={props.userInformation} />
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
                      props.addMessage(text, props.chats[currentChat].friend._id, currentChat);
                      setText("");
                      $("#new-post-text").css("height", "28px");
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

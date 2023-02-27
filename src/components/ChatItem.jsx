function ChatItem(props) {
  return (
    <div className="chat-item d-flex">
      <div className="chat-item-first d-flex justify-content-center align-items-center">
        <img src="/profile.jpg" alt="" />
      </div>
      <div className="chat-item-middle d-flex flex-column justify-content-center align-items-start">
        <span>
          {props.firstName} {props.lastName}
        </span>
        <div>{props.lastMessage}</div>
      </div>
      <div className="chat-item-last d-flex flex-column justify-content-evenly align-items-center">
        <span>{props.lastMessageDate}</span>
        <div className="new-messages-number">{props.newMessageCount}</div>
      </div>
    </div>
  );
}

export default ChatItem;

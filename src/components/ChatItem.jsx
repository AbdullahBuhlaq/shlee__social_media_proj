import calculateTime from "../functions/calculateTime";

function ChatItem(props) {
  return (
    <div
      className="chat-item flex-shrink-0 d-flex"
      onClick={() => {
        props.onClick();
      }}
    >
      <div className="chat-item-first d-flex justify-content-center align-items-center">
        <img src={props.picture ? props.picture : "/profile-photo.webp"} alt="" />
      </div>
      <div className="chat-item-middle d-flex flex-column justify-content-center align-items-start">
        <span>
          {props.firstName} {props.lastName}
        </span>
        <div>{props.lastMessage}</div>
      </div>
      <div className="chat-item-last d-flex flex-column justify-content-evenly align-items-center">
        {props.lastMessageDate ? <span>{calculateTime(props.lastMessageDate)}</span> : null}
        {props.newMessageCount ? <div className="new-messages-number">{props.newMessageCount}</div> : null}
      </div>
    </div>
  );
}

export default ChatItem;

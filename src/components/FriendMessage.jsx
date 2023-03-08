import calculateTime from "../functions/calculateTime";

function FriendMessage(props) {
  return (
    <div className={"friend-message d-flex flex-wrap align-self-start " + (props.isFirst ? "first-message " : "") + (props.isLast ? "last-message" : "")}>
      <div>{props.message.text}</div>
      <div className="message-date d-flex justify-content-end align-items-end">{calculateTime(props.message.date)}</div>
      {props.isFirst ? <img className="user-picture-in-chat" src={props.picture ? props.picture : "/profile-photo.webp"} alt="" /> : null}
    </div>
  );
}

export default FriendMessage;

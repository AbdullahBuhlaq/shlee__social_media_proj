import ChatItem from "./ChatItem";

function Chat() {
  return (
    <div className="body vw-100 flex-grow-1 d-flex">
      {/* left side */}
      <div className="left-side">
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
        <ChatItem firstName={"Abdullah"} lastName={"Buhlaq"} lastMessage={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, repudiandae."} lastMessageDate={"23:23 AM"} newMessageCount={"2"} />
      </div>

      {/* middle side */}
      <div className="middle-side chat d-flex flex-column">
        <div className="chat-header w-100 d-flex">
          <div className="chat-header-photo h-100"></div>
          <div className="chat-header-middle h-100"></div>
          <div className="chat-header-icons h-100"></div>
        </div>
        <div className="chat-body w-100 flex-grow-1"></div>
        <div className="chat-footer w-100"></div>
      </div>

      {/* right side */}
      <div className="right-side"></div>
    </div>
  );
}

export default Chat;

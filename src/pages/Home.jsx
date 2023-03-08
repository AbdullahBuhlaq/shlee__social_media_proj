import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import Chat from "../components/Chat";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001", {
  query: {
    token: localStorage.getItem("token"),
  },
});

function Home() {
  const [current, setCurrent] = useState(0);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingChats, setLoadingChats] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [duringEditFriend, setDuringEditFriend] = useState([]);
  const [newMessage, setNewMessag] = useState({});

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: "",
  };

  async function getUserInformation() {
    let token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      let infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, "x-auth-token": token },
      };
      let response = await fetch("/getUserInformation", infoRequestOptions);
      let data = await response.json();
      setUserInformation(data.result);
      setLoadingUser(false);
    }
  }
  const [userInformation, setUserInformation] = useState(() => {
    getUserInformation();
  }, {});

  async function getPosts() {
    let token = localStorage.getItem("token");
    if (token) {
      let infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, "x-auth-token": token },
      };
      let response = await fetch("/getPosts", infoRequestOptions);
      let data = await response.json();
      setPosts(data.result);
      setLoadingPosts(false);
    }
  }
  const [posts, setPosts] = useState(() => {
    getPosts();
  }, {});

  async function getChats() {
    let token = localStorage.getItem("token");
    if (token) {
      let infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, "x-auth-token": token },
      };
      let response = await fetch("/getChats", infoRequestOptions);
      let data = await response.json();
      let finalChats = {};
      await Promise.all(
        data.result.map(async (obj) => {
          finalChats[obj._id] = { ...obj, scroll: -1 };
        })
      );
      setChats({ ...finalChats });
      data.result.map((room) => {
        socket.emit("joinRoom", room._id);
      });
      setLoadingChats(false);
    }
  }
  const [chats, setChats] = useState(() => {
    getChats();
  }, {});

  async function addFriend(id) {
    if (!userInformation.friends.includes(id)) {
      let token = localStorage.getItem("token");
      let infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, "x-auth-token": token },
        body: JSON.stringify({
          id: id,
        }),
      };
      setDuringEditFriend([...duringEditFriend, id]);
      let response = await fetch("/addFriend", infoRequestOptions);
      let data = await response.json();
      if (data.result === "done") {
        setUserInformation({ ...userInformation, friends: [...userInformation.friends, id] });
        setChats({ ...chats, [data.newChat._id]: { ...data.newChat, scroll: -1 } });
        socket.emit("joinRoom", data.newChat._id);
      }
      duringEditFriend.splice(duringEditFriend.indexOf(id), 1);
      setDuringEditFriend([...duringEditFriend]);
    }
  }

  async function removeFriend(id) {
    if (userInformation.friends.includes(id)) {
      let token = localStorage.getItem("token");
      let infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, "x-auth-token": token },
        body: JSON.stringify({
          id: id,
        }),
      };
      setDuringEditFriend([...duringEditFriend, id]);
      let response = await fetch("/removeFriend", infoRequestOptions);
      let data = await response.json();
      if (data.result === "done") {
        userInformation.friends.splice(userInformation.friends.indexOf(id), 1);
        setUserInformation({ ...userInformation });
        if (data.isNewChat) {
          delete chats[data.chatId];
          setChats({ ...chats });
          socket.emit("leaveRoom", data.chatId);
        }
      }
      duringEditFriend.splice(duringEditFriend.indexOf(id), 1);
      setDuringEditFriend([...duringEditFriend]);
    }
  }

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setNewMessag(data);
    });
  }, [socket]);

  useEffect(() => {
    if (newMessage) {
      if (chats) {
        chats[newMessage.chatId].messages.push({ ownerName: newMessage.ownerName, ownerId: newMessage.ownerId, text: newMessage.text, content: null, date: newMessage.date, sent: false, recieved: false, read: false });
        setChats({ ...chats });
      }
    }
  }, [newMessage]);

  async function addMessage(text, friendId, chatId) {
    if (text) {
      const messageIndex = chats[chatId].messages.length;
      chats[chatId].messages.push({ ownerName: userInformation.userName, ownerId: userInformation._id, text: text, content: null, date: "loading", sent: false, recieved: false, read: false });
      setChats({ ...chats });
      chats[chatId].messages[messageIndex].date = Date.now();
      setChats({ ...chats });
      socket.emit("sendMessage", {
        body: {
          text: text,
          friendId: friendId,
          chatId: chatId,
        },
      });
    }
  }

  return (
    <>
      {loadingUser ? (
        <span>loading</span>
      ) : (
        <div className="vh-100 d-flex flex-column">
          <Navbar addFriend={addFriend} removeFriend={removeFriend} duringEditFriend={duringEditFriend} loggedIn={loggedIn} userInformation={userInformation} setUserInformation={setUserInformation} current={current} setCurrent={setCurrent} />
          {!loggedIn ? (
            <span>login</span>
          ) : current === 0 ? (
            <Posts addFriend={addFriend} removeFriend={removeFriend} duringEditFriend={duringEditFriend} loadingPosts={loadingPosts} posts={posts} setPosts={setPosts} userInformation={userInformation} setUserInformation={setUserInformation} />
          ) : current === 1 ? (
            <Chat loadingChats={loadingChats} userInformation={userInformation} chats={chats} setChats={setChats} addMessage={addMessage} />
          ) : current === 2 ? (
            "story"
          ) : (
            "trend"
          )}
        </div>
      )}
    </>
  );
}

export default Home;

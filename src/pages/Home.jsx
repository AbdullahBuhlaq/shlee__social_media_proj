import { useState } from "react";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import Chat from "../components/Chat";

function Home() {
  const [current, setCurrent] = useState(0);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingChats, setLoadingChats] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [duringEditFriend, setDuringEditFriend] = useState([]);

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
      setChats(data.result);
      setLoadingChats(false);
    }
  }
  const [chats, setChats] = useState(() => {
    getChats();
  }, []);

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
      if (data.result === "done") setUserInformation({ ...userInformation, friends: [...userInformation.friends, id] });
      let temp1 = duringEditFriend;
      temp1.splice(temp1.indexOf(id), 1);
      setDuringEditFriend(temp1);
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
        let temp3 = userInformation.friends;
        temp3.splice(temp3.indexOf(id), 1);
        setUserInformation({ ...userInformation, friends: temp3 });
      }
      let temp2 = duringEditFriend;
      temp2.splice(temp2.indexOf(id), 1);
      setDuringEditFriend(temp2);
    }
  }

  async function addMessage(text, friendId, chatId, currentChat) {
    if (text) {
      let token = localStorage.getItem("token");
      let infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, "x-auth-token": token },
        body: JSON.stringify({
          text: text,
          friendId: friendId,
          chatId: chatId,
        }),
      };
      console.log('hello');
      // chats[currentChat].messages.push({ownerName: userInformation.userName, ownerId: userInformation._id, text: text, content: null, date: Date.now, sent: false, recieved: false, read: false })
      // setChats(chats)
      let response = await fetch("/addMessage", infoRequestOptions);
      let data = await response.json();
      if (data.result === "done") console.log("done");
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

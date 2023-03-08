import { useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import ReactionList from "../components/ReactionList";
import CommentList from "../components/CommentList";
import showLikeList from "../functions/showLikeList";
import showCommentList from "../functions/showCommentList";

function Profile() {
  let params = useParams();
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [refh, setRefh] = useState("0px");
  const [refp, setRefp] = useState("static");
  const [duringEditFriend, setDuringEditFriend] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [likeList, setLikeList] = useState([]);
  const [commentList, setCommentList] = useState({ postId: "", friendIndex: 0, postIndex: 0, comments: [] });
  const [currentTab, setCurrentTab] = useState(0);
  const ref = useRef();
  const ref2 = useRef();

  const TAB = [
    { text: "Info", icon: "fa-regular fa-comments" },
    { text: "Posts", icon: "fa-solid fa-newspaper" },
    { text: "Stories", icon: "fa-solid fa-circle-info" },
  ];

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: "",
  };

  async function getProfileInformation() {
    let token = localStorage.getItem("token");
    if (token) {
      let infoRequestOptions = {
        ...requestOptions,
        body: JSON.stringify({
          id: params.id,
        }),
      };
      let response = await fetch("/getProfileInformation", infoRequestOptions);
      let data = await response.json();
      setProfileInformation(data.result);
      setLoadingProfile(false);
    }
  }
  const [profileInformation, setProfileInformation] = useState(() => {
    getProfileInformation();
  }, {});

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
        body: JSON.stringify({
          id: params.id,
        }),
      };
      let response = await fetch("/getProfilePosts", infoRequestOptions);
      let data = await response.json();
      setPosts(data.result);
      setLoadingPosts(false);
    }
  }
  const [posts, setPosts] = useState(() => {
    getPosts();
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

  async function addLike(postId, friendIndex, postIndex) {
    let infoRequestOptions = {
      ...requestOptions,
      body: JSON.stringify({
        postId: postId,
        userId: userInformation._id,
      }),
    };
    let response = await fetch("/addLike", infoRequestOptions);
    let data = await response.json();
    if (data.result == "done") {
      posts[friendIndex].posts[posts[friendIndex].posts.length - 1 - postIndex].likes.push(userInformation._id);
      setPosts([...posts]);
    }
  }

  async function removeLike(postId, friendIndex, postIndex) {
    let infoRequestOptions = {
      ...requestOptions,
      body: JSON.stringify({
        postId: postId,
        userId: userInformation._id,
      }),
    };
    let response = await fetch("/removeLike", infoRequestOptions);
    let data = await response.json();
    if (data.result == "done") {
      let index = posts[friendIndex].posts[posts[friendIndex].posts.length - 1 - postIndex].likes.indexOf(userInformation._id);
      posts[friendIndex].posts[posts[friendIndex].posts.length - 1 - postIndex].likes.splice(index, 1);
      setPosts([...posts]);
    }
  }

  return (
    <>
      {loadingProfile || loadingUser ? (
        <span>loading</span>
      ) : (
        <div className="vh-100 d-flex flex-column">
          <div className="body vw-100 flex-grow-1 d-flex">
            <div className="left-side"></div>
            <div className="middle-side">
              <div className=" position-absolute top-0 start-50 translate-middle-x w-100" style={{ height: "inherit" }}>
                <div
                  className=" d-flex flex-column align-items-center posts-container"
                  onScroll={() => {
                    if (ref2.current && ref2.current.getBoundingClientRect().y <= 0) {
                      setRefh("50px");
                      setRefp("fixed");
                    } else {
                      setRefh("0px");
                      setRefp("static");
                    }
                  }}
                >
                  <div className="profile-cover flex-shrink-0">
                    <img src="/cover.jpg" alt="" />
                    <img className="profile-photo" src={profileInformation && profileInformation.picture ? profileInformation.picture : "/profile-photo.webp"} alt="" />
                  </div>
                  <div className="profile-options flex-shrink-0 d-flex justify-content-center">
                    <div className="profile-options-left flex-grow-1 d-flex justify-content-first align-items-center">
                      <div>
                        <i className="fa-solid fa-user-plus"></i>
                      </div>
                      <div>
                        <i className="fa-regular fa-thumbs-up"></i>
                      </div>
                      <div>
                        <i className="fa-solid fa-message"></i>
                      </div>
                    </div>
                    <div className="profile-options-middle flex-grow-1 d-flex justify-content-center align-items-end">
                      {profileInformation.firstName} {profileInformation.lastName}
                    </div>
                    <div className="profile-options-right flex-grow-1 d-flex justify-content-end align-items-center">
                      <div>
                        <i className="fa-solid fa-hand-point-right"></i>
                      </div>
                      <div>
                        <i className="fa-solid fa-comments"></i>
                      </div>
                      <div>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0" ref={ref2} style={{ height: refh }}></div>
                  <div className="profile-navbar flex-shrink-0 d-flex justify-content-center align-items-center" ref={ref} style={{ position: refp }}>
                    {TAB.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={index === currentTab ? "profile-current-tab" : ""}
                          onClick={() => {
                            setCurrentTab(index);
                          }}
                        >
                          {item.text}
                        </div>
                      );
                    })}
                  </div>
                  <div className="profile-body">
                    {currentTab === 0 ? (
                      <div className="d-flex flex-column profile-info">
                        <div className="d-flex flex-column align-items-center profile-item ">
                          <span>
                            <i className="fa-solid fa-user-pen"></i> Bio
                          </span>
                          <div>{profileInformation.statu ? profileInformation.statu : "Hello there, I'm hissing on Shlee!"}</div>
                        </div>
                        <div className="d-flex flex-column align-items-center profile-item">
                          <span>
                            <i className="fa-solid fa-signature"></i> User Name
                          </span>
                          <div>@{profileInformation.userName}</div>
                        </div>
                        <div className="d-flex flex-column align-items-center profile-item">
                          <span>
                            <i className="fa-solid fa-square-phone"></i> Phone Number
                          </span>
                          <div>{profileInformation.phone ? profileInformation.phone : "___"}</div>
                        </div>
                        <div className="d-flex justify-content-center profile-info-one-line">
                          <div className="flex-grow-1 d-flex flex-column align-items-center profile-item">
                            <span>
                              <i className="fa-solid fa-house"></i> Home
                            </span>
                            <div>Homs lakjsdlfj alsdkjfljasd a sdfljalsd lkasjdlkfj</div>
                          </div>
                          <div className="flex-grow-1 d-flex flex-column align-items-center profile-item">
                            <span>
                              <i className="fa-solid fa-location-dot"></i> Live in
                            </span>
                            <div>Home</div>
                          </div>
                          <div className="flex-grow-1 d-flex flex-column align-items-center profile-item">
                            <span>
                              <i className="fa-solid fa-graduation-cap"></i> Studying at
                            </span>
                            <div>___</div>
                          </div>
                          <div className="flex-grow-1 d-flex flex-column align-items-center profile-item">
                            <span>
                              <i className="fa-solid fa-briefcase"></i> Working at
                            </span>
                            <div>___</div>
                          </div>
                        </div>
                        <div className="flex-grow-1 d-flex flex-column align-items-center profile-item">
                          <span style={{ color: "var(--bs-link-color)", cursor: "pointer" }}>
                            <i className="fa-solid fa-circle-info"></i> More Info
                          </span>
                        </div>
                      </div>
                    ) : currentTab === 1 ? (
                      <>
                        <div className="d-flex flex-column align-items-center">
                          {posts &&
                            posts.map((friend, friendIndex) => {
                              return friend.posts
                                .slice(0)
                                .reverse()
                                .map((item, index) => {
                                  return <Post userInformation={userInformation} friendIndex={friendIndex} postIndex={index} postId={item._id} key={index} addLike={addLike} removeLike={removeLike} showLikeList={showLikeList} showCommentList={showCommentList} post={item} friend={friend} setLikeList={setLikeList} setCommentList={setCommentList} />;
                                });
                            })}
                        </div>
                        <ReactionList userInformation={userInformation} duringEditFriend={duringEditFriend} addFriend={addFriend} removeFriend={removeFriend} likeList={likeList} setLikeList={setLikeList} />
                        <CommentList setPosts={setPosts} posts={posts} userInformation={userInformation} commentList={commentList} setCommentList={setCommentList} />
                      </>
                    ) : (
                      <div> Stories </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="right-side"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;

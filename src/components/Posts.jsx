import $ from "jquery";
import Post from "./Post";
import StoryCirclePhoto from "./StoryCirclePhoto";
import AddPostSection from "./AddPostSection";
import ReactionList from "./ReactionList";
import CommentList from "./CommentList";
import { useState } from "react";

function Posts(props) {
  const [likeList, setLikeList] = useState([]);
  const [commentList, setCommentList] = useState({ postId: "", friendIndex: 0, postIndex: 0, comments: [] });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: "",
  };

  async function addLike(postId, friendIndex, postIndex) {
    let infoRequestOptions = {
      ...requestOptions,
      body: JSON.stringify({
        postId: postId,
        userId: props.userInformation._id,
      }),
    };
    let response = await fetch("/addLike", infoRequestOptions);
    let data = await response.json();
    if (data.result == "done") {
      props.posts[friendIndex].posts[props.posts[friendIndex].posts.length - 1 - postIndex].likes.push(props.userInformation._id);
      props.setPosts([...props.posts]);
    }
  }

  async function removeLike(postId, friendIndex, postIndex) {
    let infoRequestOptions = {
      ...requestOptions,
      body: JSON.stringify({
        postId: postId,
        userId: props.userInformation._id,
      }),
    };
    let response = await fetch("/removeLike", infoRequestOptions);
    let data = await response.json();
    if (data.result == "done") {
      let index = props.posts[friendIndex].posts[props.posts[friendIndex].posts.length - 1 - postIndex].likes.indexOf(props.userInformation._id);
      props.posts[friendIndex].posts[props.posts[friendIndex].posts.length - 1 - postIndex].likes.splice(index, 1);
      props.setPosts([...props.posts]);
    }
  }

  async function showLikeList(fanIds) {
    let infoRequestOptions = {
      ...requestOptions,
      body: JSON.stringify({
        fanIds: fanIds,
      }),
    };
    const response = await fetch("/getLikeList", infoRequestOptions);
    const data = await response.json();
    setLikeList(data.result);
  }

  async function showCommentList(commentIds, postId, friendIndex, postIndex) {
    let infoRequestOptions = {
      ...requestOptions,
      body: JSON.stringify({
        commentIds: commentIds,
      }),
    };
    const response = await fetch("/getCommentList", infoRequestOptions);
    const data = await response.json();
    setCommentList({ postId: postId, friendIndex: friendIndex, postIndex: postIndex, comments: data.result });
  }

  return (
    <div className="body vw-100 flex-grow-1 d-flex">
      {/* left side */}
      <div className="left-side"></div>

      {/* middle side */}
      <div className="middle-side">
        <AddPostSection userInformation={props.userInformation} />
        <div className="d-flex flex-column align-items-center position-absolute top-0 start-50 translate-middle-x posts-container">
          <div className="stories-section d-flex justify-content-end align-items-center">
            <button
              className="btn-submit add-post"
              onClick={() => {
                $(".add-post-section").fadeIn();
              }}
            >
              Add Post +
            </button>
            <div className="stories-line d-flex">
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
            </div>
          </div>
          {props.loadingPosts ? (
            <span>loading</span>
          ) : (
            props.posts &&
            props.posts.map((friend, friendIndex) => {
              return friend.posts
                .slice(0)
                .reverse()
                .map((item, index) => {
                  return <Post userInformation={props.userInformation} friendIndex={friendIndex} postIndex={index} postId={item._id} key={index} addLike={addLike} removeLike={removeLike} showLikeList={showLikeList} showCommentList={showCommentList} post={item} friend={friend} />;
                });
            })
          )}
        </div>
        <ReactionList userInformation={props.userInformation} duringEditFriend={props.duringEditFriend} addFriend={props.addFriend} removeFriend={props.removeFriend} likeList={likeList} setLikeList={setLikeList} />
        <CommentList setPosts={props.setPosts} posts={props.posts} userInformation={props.userInformation} commentList={commentList} setCommentList={setCommentList} />
      </div>

      {/* right side */}
      <div className="right-side"></div>
    </div>
  );
}

export default Posts;

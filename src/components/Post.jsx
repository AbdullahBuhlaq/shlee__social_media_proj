import $ from "jquery";
import { useNavigate } from "react-router-dom";

import calculateDate from "../functions/calculateDate";

function Post(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="post">
        <div className="post-header d-flex justify-content-between align-items-center">
          <div
            className="d-flex align-items-center cursor"
            onClick={() => {
              navigate(`/profile/${props.friend._id}`);
            }}
          >
            <img className="navbar-profile-photo object-fit-scale" src={props.friend.picture != "" ? props.friend.picture : "/profile-photo.webp"} />
            <div className="d-flex flex-column">
              <span>
                {props.friend.firstName} {props.friend.lastName}
              </span>
              <span>
                @{props.friend.userName} ⚪ {calculateDate(props.post.date)}
              </span>
            </div>
          </div>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div className="post-text" style={props.post.text ? {} : { padding: "0px" }}>
          {props.post.text ? props.post.text : ""}
        </div>
        <div className="post-image">{props.post.content.length ? <img src={props.post.content.length ? props.post.content[0] : ""} /> : null}</div>
        <div className="post-footer d-flex justify-content-around">
          <div className="d-flex align-items-center">
            {props.post.likes.includes(props.userInformation._id) ? (
              <i
                className="fa-solid fa-thumbs-up"
                onClick={() => {
                  props.removeLike(props.post._id, props.friendIndex, props.postIndex);
                }}
              ></i>
            ) : (
              <i
                className="fa-regular fa-thumbs-up"
                onClick={() => {
                  props.addLike(props.post._id, props.friendIndex, props.postIndex);
                }}
              ></i>
            )}
            <span
              className="cursor"
              onClick={() => {
                props.showLikeList(props.post.likes, props.setLikeList);
                $(".reaction-list").slideDown();
              }}
            >
              {props.post.likes.length}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <i
              className="fa-regular fa-message"
              onClick={() => {
                props.showCommentList(props.post.comments, props.postId, props.friendIndex, props.postIndex, props.setCommentList);
                $(".comment-list").slideDown();
              }}
            ></i>
            <span
              className="cursor"
              onClick={() => {
                props.showCommentList(props.post.comments);
                $(".comment-list").slideDown();
              }}
            >
              {props.post.comments.length}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <i className="fa-regular fa-share-from-square"></i>
            <span className="cursor">{props.post.shares.length}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;

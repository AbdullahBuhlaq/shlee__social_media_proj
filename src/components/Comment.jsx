import { useState } from "react";
import $ from "jquery";
import { useRef } from "react";
import { useEffect } from "react";
import calculateDate from "../functions/calculateDate";
import { useNavigate } from "react-router-dom";

function Comment(props) {
  const [readMore, setReadMore] = useState(0);
  const navigate = useNavigate();
  const ref = useRef();
  useEffect(() => {
    ref.current.clientHeight > 40 && setReadMore(1);
  }, []);
  return (
    <div className="comment-container">
      <div className="post-header comment-header d-flex justify-content-between align-items-center">
        <div
          className="d-flex align-items-center cursor"
          onClick={() => {
            navigate(`/profile/${props.item.ownerInfo._id}`);
          }}
        >
          <img className="navbar-profile-photo object-fit-scale" src={props.item.ownerInfo.picture} />
          <div className="d-flex flex-column">
            <span>
              {props.item.ownerInfo.firstName} {props.item.ownerInfo.lastName}
            </span>
            <span>
              @{props.item.ownerInfo.userName} ⚫ {calculateDate(props.item.date)}
            </span>
          </div>
        </div>
        <div className="comment-icons d-flex">
          <div className="d-flex">
            {props.item.likes.includes(props.userInformation._id) ? (
              <i
                className="fa-solid fa-thumbs-up"
                onClick={() => {
                  props.removeCommentLike(props.item._id, props.index);
                }}
              ></i>
            ) : (
              <i
                className="fa-regular fa-thumbs-up"
                onClick={() => {
                  props.addCommentLike(props.item._id, props.index);
                }}
              ></i>
            )}

            <span>{props.item.likes.length}</span>
          </div>
          <div className="d-flex">
            <i className="fa-regular fa-comment-dots"></i>
            <span>{props.item.replies.length}</span>
          </div>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>
      <div className="comment-body">
        <div className="comment-text" ref={ref} style={readMore ? { WebkitLineClamp: 2 } : {}}>
          {props.item.text ? props.item.text : ""}
          {readMore ? (
            readMore == 1 ? (
              <span
                className="read-more"
                onClick={() => {
                  ref.current.style.WebkitLineClamp = "initial";
                  setReadMore(2);
                }}
              >
                <i className="fa-solid fa-angle-down"></i>
              </span>
            ) : (
              <span
                className="read-less"
                onClick={() => {
                  ref.current.style.WebkitLineClamp = 2;
                  setReadMore(1);
                }}
              >
                <i className="fa-solid fa-angle-up"></i>
              </span>
            )
          ) : null}
        </div>
        {props.item.content.length ? <img src={props.item.content[0]} alt="" /> : null}
      </div>
    </div>
  );
}

export default Comment;

import $ from "jquery";
import { useState } from "react";
import Comment from "./Comment";

function CommentList(props) {
  const [commentText, setCommentText] = useState("");
  const [photo, setPhoto] = useState({ value: "", name: "", type: "" });
  const [animate, setAnimate] = useState(false);

  function photoHandler(img) {
    var reader = new FileReader();
    reader.onload = function () {
      setPhoto({ value: reader.result, type: img.type, name: img.name });
    };
    reader.readAsDataURL(img);
  }

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: "",
  };

  async function addComment() {
    if (!(photo.value == "" && commentText == "")) {
      let token = localStorage.getItem("token");
      let infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, "x-auth-token": token },
        body: JSON.stringify({
          content: [photo],
          text: commentText,
          postId: props.commentList.postId,
        }),
      };
      setAnimate(true);
      let response = await fetch("/addComment", infoRequestOptions);
      let data = await response.json();
      if (data.result === "Done") {
        props.setCommentList({ ...props.commentList, comments: [...props.commentList.comments, { ...data.comment, ownerInfo: { firstName: props.userInformation.firstName, lastName: props.userInformation.lastName, userName: props.userInformation.userName, _id: props.userInformation._id, picture: props.userInformation.picture } }] });
        props.posts[props.commentList.friendIndex].posts[props.posts[props.commentList.friendIndex].posts.length - 1 - props.commentList.postIndex].comments.push(data.comment._id);
        props.setPosts([...props.posts]);
        setCommentText("");
        setPhoto({ value: "", name: "", type: "" });
        $(".add-new-comment").css("height", "auto");
      }
      setAnimate(false);
    }
  }

  // async function addCommentLike(commentId){
  //   let token = localStorage.getItem("token");
  //     let infoRequestOptions = {
  //       ...requestOptions,
  //       headers: { ...requestOptions.headers, "x-auth-token": token },
  //       body: JSON.stringify({
  //         commentId: commentId,
  //       }),
  //     };
  //     let response = await fetch("/addCommentLike", infoRequestOptions);
  //     let data = await response.json();
  //     if (data.result === "Done") {
  //       setCommentText("");
  //       setPhoto({ value: "", name: "", type: "" });
  //       $(".add-new-comment").css("height", "auto");
  //     }
  //     setAnimate(false);
  // }

  return (
    <div className="comment-list flex-column" style={{ display: "none" }}>
      <div className="comment-list-header d-flex justify-content-center align-items-center">
        <div className="comment-list-back-icon">
          <i
            className="fa-solid fa-angle-left"
            onClick={async () => {
              $(".comment-list").slideUp();
              props.setCommentList({ postId: "", friendIndex: 0, postIndex: 0, comments: [] });
            }}
          ></i>
        </div>
        <div className="comment-list-title">{props.commentList.comments.length} Comments on This Post</div>
      </div>

      <div className="d-flex flex-column comment-list-body">
        <div className="comments">
          {props.commentList.comments.map((item, index) => {
            return <Comment key={index} item={item} />;
          })}
        </div>
      </div>
      <div className="comment-list-add-comment d-flex align-items-top">
        <textarea
          className="flex-grow-1 add-new-comment align-self-center"
          placeholder="Type your comment text here ..."
          name="new-post-text"
          value={commentText}
          onChange={(event) => {
            setCommentText(event.target.value);
            $(".add-new-comment").on("input", function () {
              this.style.height = 0;
              this.style.height = this.scrollHeight + "px";
            });
          }}
        ></textarea>{" "}
        <div className="btn-submit comment-add-picture d-flex align-items-center justify-content-center" style={photo.value ? { backgroundImage: "url('" + photo.value + "')", backgroundSize: "cover" } : {}}>
          <label htmlFor="comment-photo">
            <i className="fa-solid fa-icons" style={{ backgroundColor: "rgba(255,255,255,0.4)" }}></i>
          </label>
        </div>
        <input id="comment-photo" type="file" onChange={(event) => photoHandler(event.target.files[0])} />
        <button
          className="btn-submit position-relative"
          onClick={() => {
            addComment();
          }}
          disabled={animate}
        >
          {animate ? <i className="fa-solid fa-spinner position-absolute top-50 search-icon circle-animation"></i> : "Post"}
        </button>
      </div>
    </div>
  );
}

export default CommentList;

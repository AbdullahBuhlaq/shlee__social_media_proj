import $ from "jquery";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewPost(props) {
  const navigate = useNavigate();

  return (
    <>
      <div className="post">
        <div className="post-header d-flex justify-content-between align-items-center">
          <div
            className="d-flex align-items-center cursor"
            onClick={() => {
              navigate(`/profile/${props.userInformation._id}`);
            }}
          >
            <img className="navbar-profile-photo object-fit-scale" src={props.userInformation.picture ? props.userInformation.picture : "/profile-photo.webp"} alt="" />
            <div className="d-flex flex-column">
              <span>
                {props.userInformation.firstName} {props.userInformation.lastName}
              </span>
              <span>
                @{props.userInformation.userName} ⚪ {props.date}
              </span>
            </div>
          </div>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div className="post-text">
          <textarea
            placeholder="Type your post text here ..."
            name="new-post-text"
            id="new-post-text"
            value={props.text}
            onChange={(event) => {
              props.setText(event.target.value);
              $("#new-post-text").on("input", function () {
                this.style.height = 0;
                this.style.height = this.scrollHeight + "px";
              });
            }}
          ></textarea>
        </div>
        <div className="post-image">
          {props.photo.value && <img src={props.photo.value} alt="post image" />}
          <div className="d-flex justify-content-center new-post-photo-section">
            <label htmlFor="new-post-photo">
              <span className="new-post-photo-btn">add photo</span>
            </label>
          </div>
          <input id="new-post-photo" type="file" onChange={(event) => props.changePhotoHandle(event.target.files[0])} />
        </div>
        <div className="post-footer d-flex justify-content-around">
          <div className="d-flex align-items-center">
            <i className="fa-regular fa-thumbs-up"></i>
          </div>
          <div className="d-flex align-items-center">
            <i className="fa-regular fa-message"></i>
          </div>
          <div className="d-flex align-items-center">
            <i className="fa-regular fa-share-from-square"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPost;

import $ from "jquery";
import { useNavigate } from "react-router-dom";

function ReactionList(props) {
  const navigate = useNavigate();
  return (
    <div className="reaction-list" style={{ display: "none" }}>
      <div className="reaction-list-header d-flex justify-content-center align-items-center">
        <div className="reaction-list-back-icon">
          <i
            className="fa-solid fa-angle-left"
            onClick={async () => {
              $(".reaction-list").slideUp();
              props.setLikeList([]);
            }}
          ></i>
        </div>
        <div className="reaction-list-title">{props.likeList.length} Person Liked This Post</div>
      </div>
      <div className="d-flex flex-column reaction-list-body">
        {props.likeList.map((user, index) => {
          return (
            <div key={index} className="d-flex justify-content-start align-items-center like-list-item">
              {user.picture ? (
                <img
                  className="navbar-profile-photo object-fit-scale cursor"
                  src={user.picture}
                  onClick={() => {
                    navigate(`/profile/${user._id}`);
                  }}
                />
              ) : (
                <img
                  className="navbar-profile-photo object-fit-scale cursor"
                  src="/profile-photo.webp"
                  onClick={() => {
                    navigate(`/profile/${user._id}`);
                  }}
                />
              )}
              <div
                className="d-flex flex-column cursor"
                onClick={() => {
                  navigate(`/profile/${user._id}`);
                }}
              >
                <span className="search-result-name">
                  {user.firstName} {user.lastName}
                </span>
                <span className="search-result-userName">@{user.userName}</span>
              </div>
              <div className="search-result-friend-statu">
                {props.userInformation.userName == user.userName ? (
                  ""
                ) : props.duringEditFriend.includes(user._id) ? (
                  <i className="fa-solid fa-user-clock"></i>
                ) : (
                  props.userInformation && (props.userInformation.friends.includes(user._id) ? <i className="fa-solid fa-user-minus" onClick={() => props.removeFriend(user._id)}></i> : <i className="fa-solid fa-user-plus" onClick={() => props.addFriend(user._id)}></i>)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReactionList;

import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [duringSearch, setDuringSearch] = useState(false);
  const navigate = useNavigate();

  const TAB = [
    { text: "Posts", icon: "fa-solid fa-newspaper" },
    { text: "Chat", icon: "fa-regular fa-comments" },
    { text: "Story", icon: "fa-solid fa-camera-retro" },
    { text: "Trend", icon: "fa-solid fa-money-bill-trend-up" },
  ];

  function NavbarItems() {
    return TAB.map((item, index) => {
      return (
        <div key={index} className={"navbar-item " + (props.current === index - 1 ? "right-current" : props.current === index + 1 ? "left-current" : "")} onClick={() => props.setCurrent(index)}>
          {props.current === index ? (
            <>
              <span className="position-absolute bottom-0 start-50 translate-middle-x navbar-item-text">{item.text}</span>
              <div className="navbar-item-before"></div>
              <div className="navbar-item-after">
                <i className={item.icon + " position-absolute top-50 start-50 translate-middle"}></i>
              </div>
            </>
          ) : (
            <>
              <span className="icon-25">
                {" "}
                <i className={item.icon + " position-absolute top-50 start-50 translate-middle"}></i>
              </span>
            </>
          )}
        </div>
      );
    });
  }

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: "",
  };
  async function searchUser() {
    if (search !== "") {
      let infoRequestOptions = {
        ...requestOptions,
        body: JSON.stringify({
          search: search,
        }),
      };
      setDuringSearch(true);
      let response = await fetch("/getSearchResult", infoRequestOptions);
      let data = await response.json();
      setDuringSearch(false);
      setSearchResult(data.result);
    } else setSearchResult([]);
  }

  useEffect(() => {
    searchUser();
  }, [search]);

  return (
    <>
      <div className="navbar vw-100">
        <div className="navbar-first">
          <img src="/icon2.png" className="position-absolute top-50 start-0 translate-middle-y navbar-icon" />
        </div>
        <div className="navbar-middle">
          <div className="d-flex">
            <div className={"navbar-middle-first flex-grow-1 " + (props.current === 0 ? "left-current" : "")}>
              <form action="">
                <input
                  required={true}
                  type={"text"}
                  placeholder={"search... "}
                  className="input-field search-field position-absolute top-50 start-0 translate-middle-y"
                  value={search}
                  onChange={(element) => setSearch(element.target.value)}
                  onBlur={() => {
                    setSearch("");
                    setSearchResult([]);
                  }}
                />
                {duringSearch ? <i className="fa-solid fa-spinner position-absolute top-50 search-icon circle-animation"></i> : <i className="fa-solid fa-magnifying-glass position-absolute top-50 translate-middle-y search-icon" onClick={() => searchUser()}></i>}
                <div
                  className="search-result d-flex flex-column"
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                >
                  {searchResult &&
                    searchResult.map((item, index) => {
                      if (item._id !== props.userInformation._id)
                        return (
                          <div key={index} className="d-flex justify-content-start align-items-center search-result-item">
                            {item.picture ? (
                              <img
                                className="navbar-profile-photo object-fit-scale cursor"
                                src={item.picture}
                                onClick={() => {
                                  navigate(`/profile/${item._id}`);
                                }}
                              />
                            ) : (
                              <img
                                className="navbar-profile-photo object-fit-scale cursor"
                                src="/profile-photo.webp"
                                onClick={() => {
                                  navigate(`/profile/${item._id}`);
                                }}
                              />
                            )}
                            <div
                              className="d-flex flex-column cursor"
                              onClick={() => {
                                navigate(`/profile/${item._id}`);
                              }}
                            >
                              <span className="search-result-name">
                                {item.firstName} {item.lastName}
                              </span>
                              <span className="search-result-userName">@{item.userName}</span>
                            </div>
                            <div className="search-result-friend-statu">
                              {props.duringEditFriend.includes(item._id) ? <i className="fa-solid fa-user-clock"></i> : props.userInformation && (props.userInformation.friends.includes(item._id) ? <i className="fa-solid fa-user-minus" onClick={() => props.removeFriend(item._id)}></i> : <i className="fa-solid fa-user-plus" onClick={() => props.addFriend(item._id)}></i>)}
                            </div>
                          </div>
                        );
                      else return;
                    })}
                </div>
              </form>
            </div>
            <div className="navbar-middle-middle d-flex">
              <NavbarItems />
            </div>
            <div className={"navbar-middle-last flex-grow-1 " + (props.current === TAB.length - 1 ? "right-current" : "")}>
              <div
                className="position-absolute top-50 end-0 translate-middle-y d-flex h-auto navbar-profile cursor"
                onClick={() => {
                  navigate(`/profile/${props.userInformation._id}`);
                }}
              >
                <span className="navbar-user-name position-absolute top-50 translate-middle-y">{props.userInformation ? props.userInformation.userName : ""}</span>
                <img className="navbar-profile-photo object-fit-scale" src={props.userInformation && props.userInformation.picture ? props.userInformation.picture : "/profile-photo.webp"} />
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-last d-flex flex-row-reverse">
          <div className="navbar-last-item position-relative">
            <i
              className="fa-solid fa-right-from-bracket position-absolute top-50 start-50 translate-middle"
              style={{ color: "#971c1c" }}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
          <div className="navbar-last-item position-relative">
            <i className="fa-solid fa-gear position-absolute top-50 start-50 translate-middle"></i>
          </div>
          <div className="navbar-last-item position-relative">
            <i className="fa-solid fa-bell position-absolute top-50 start-50 translate-middle"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

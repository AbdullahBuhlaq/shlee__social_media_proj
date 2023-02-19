import $ from "jquery";
import { useState } from "react";
import NewPost from "./NewPost";

function AddPostSection(props) {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState({ value: "", name: "", type: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [animate, setAnimate] = useState(false);

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: "",
  };

  function photoHandler(img) {
    var reader = new FileReader();
    reader.onload = function () {
      setPhoto({ value: reader.result, type: img.type, name: img.name });
    };
    reader.readAsDataURL(img);
  }

  async function addPost(event) {
    event.preventDefault();

    if (!(photo.value == "" && text == "")) {
      setErrorMessage("");
      let token = localStorage.getItem("token");
      let infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, "x-auth-token": token },
        body: JSON.stringify({
          content: [photo],
          text: text,
        }),
      };
      setAnimate(true);
      let response = await fetch("/addPost", infoRequestOptions);
      let data = await response.json();
      if (data.result === "Done") {
        removeContent();
      }
      setAnimate(false);
    } else {
      setErrorMessage("Enter some content!");
    }
  }

  function removeContent() {
    $(".add-post-section").fadeOut();
    setText("");
    setErrorMessage("");
    setPhoto({ value: "", name: "", type: "" });
  }

  return (
    <>
      <form className="flex-column align-items-center position-absolute top-0 start-50 translate-middle-x add-post-section" style={{ display: "none" }} onSubmit={addPost}>
        <span className="text-danger">{errorMessage}</span>
        {animate && (
          <div className="text-primary">
            Hissing
            <div className="dot1"></div>
            <div className="dot2"></div>
            <div className="dot3"></div>
            tssssss
          </div>
        )}
        <NewPost userInformation={props.userInformation} date={"hissing now..."} text={text} setText={setText} photo={photo} changePhotoHandle={photoHandler} />
        <div className="d-flex align-items-center justify-content-center w-100">
          <button type="submit" className="btn-submit add-post-button" disabled={animate}>
            Done
          </button>
          <button type="reset" className="btn-submit add-post-button" onClick={() => removeContent()} disabled={animate}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default AddPostSection;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicPhoto from "./BasicPhoto";
import RegisterInputField from "./RegisterInputField";
function BasicInformations(props) {
  const [photo, setPhoto] = useState({ value: "/profile-photo.webp", name: "profile-photo.webp", type: "webp" });
  const [statu, setStatu] = useState({ value: "", validateText: [""], view: false, isValid: [true] });
  const [phone, setPhone] = useState({ value: "", validateText: [""], view: true, isValid: [true] });
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: "",
  };

  async function basicInformation(event) {
    event.preventDefault();

    if (phone.isValid[0]) {
      props.setErrorMessage("");
      let token = localStorage.getItem("token");
      let infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, "x-auth-token": token },
        body: JSON.stringify({
          picture: photo,
          phone: phone.value,
          statu: statu.value,
        }),
      };
      setAnimate(true);
      let response = await fetch("/basicInformation", infoRequestOptions);
      let data = await response.json();
      if (data.result === "Done") navigate("/home");
      setAnimate(false);
    } else {
      props.setErrorMessage("Enter a valid phone number please");
    }
  }

  function photoHandler(img) {
    var reader = new FileReader();
    reader.onload = function () {
      setPhoto({ value: reader.result, type: img.type, name: img.name });
    };
    reader.readAsDataURL(img);
  }

  function statuHandler(event) {
    setStatu({ ...statu, value: event.target.value });
  }
  function phoneHandler(event) {
    const isValid = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/.test(event.target.value);
    if (isValid || event.target.value === "") setPhone({ ...phone, value: event.target.value, validateText: ["valid number"], isValid: [true] });
    else setPhone({ ...phone, value: event.target.value, validateText: ["not valid number"], isValid: [false] });
  }

  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle px-5 bg-white basic-input-container d-flex flex-column">
        <form onSubmit={basicInformation}>
          <BasicPhoto photo={photo} onChange={photoHandler} animate={animate} />
          <RegisterInputField type="text" name="Your Statu" variable={statu} onChange={statuHandler} setVariable={setStatu} required={false} />
          <RegisterInputField type="text" name="Your Phone" variable={phone} onChange={phoneHandler} setVariable={setPhone} required={false} />

          <div className="input-parent">
            <button type="submit" className="mx-auto btn-submit" disabled={animate}>
              Done
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default BasicInformations;

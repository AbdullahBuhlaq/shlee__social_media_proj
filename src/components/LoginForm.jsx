import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterInputField from "../components/RegisterInputField";

function LoginForm(props) {
  const [userName, setUserName] = useState({ value: "", validateText: [""], view: false, isValid: [true] });
  const [password, setPassword] = useState({ value: "", validateText: [""], view: false, isValid: [true] });
  const [email, setEmail] = useState({ value: "", validateText: [""], view: false, isValid: [true] });
  const [byUserName, setByUserName] = useState(true);
  const [disabledButton, setDisabledButton] = useState(false);
  const navigate = useNavigate();

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  async function loginUser(event) {
    event.preventDefault();

    setDisabledButton(true);
    let body = byUserName ? JSON.stringify({ userName: userName.value, password: password.value }) : JSON.stringify({ email: email.value, password: password.value });
    let response = await fetch("/Login", { ...requestOptions, body: body });
    let data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      props.setErrorMessage("");
      navigate("/home");
    }
    props.setErrorMessage(data.result);
    setDisabledButton(false);
  }

  function userNameHandler(event) {
    setUserName({ ...userName, value: event.target.value });
  }
  function emailHandler(event) {
    setEmail({ ...email, value: event.target.value });
  }
  function passwordHandler(event) {
    setPassword({ ...password, value: event.target.value });
  }

  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle px-5 bg-white register-form">
        <form onSubmit={loginUser}>
          <br />
          <span className="byUserName" onClick={() => setByUserName(!byUserName)}>
            by {byUserName ? "email" : "user name"}?
          </span>
          <br />
          {byUserName ? (
            <>
              <RegisterInputField required={true} type="text" name="user name" variable={userName} onChange={userNameHandler} setVariable={setUserName} />
            </>
          ) : (
            <>
              <RegisterInputField required={true} type="email" name="email" variable={email} onChange={emailHandler} setVariable={setEmail} />
            </>
          )}

          <RegisterInputField required={true} type="password" name="password" variable={password} onChange={passwordHandler} setVariable={setPassword} />
          <div className="input-parent flex-column">
            <button type="submit" className="mx-auto btn-submit" disabled={disabledButton}>
              Login
            </button>
            <a href="/register" className="mx-auto link">
              Dont Have an Account? Register
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;

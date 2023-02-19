import { useState } from "react";
import RegisterInputField from "../components/RegisterInputField";

function RegisterForm(props) {
  const [userName, setUserName] = useState({ value: "", validateText: ["English letters and Numbers, ", "5 to 20 letters"], view: false, isValid: [false, false] });
  const [firstName, setFirstName] = useState({ value: "", validateText: [""], view: false, isValid: [true] });
  const [lastName, setLastName] = useState({ value: "", validateText: [""], view: false, isValid: [true] });
  const [password, setPassword] = useState({ value: "", validateText: ["Capital English letter, ", "Small English letter, ", "Number, ", "Special character, ", "5 to 20 letters"], view: false, isValid: [false, false, false, false, false] });
  const [repeatPassword, setRepeatPassword] = useState({ value: "", validateText: [""], view: false, isValid: [false] });
  const [email, setEmail] = useState({ value: "", validateText: [""], view: false, isValid: [false] });
  const [disabledButton, setDisabledButton] = useState(false);

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: userName.value.trim(),
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
    }),
  };

  async function registerUser(event) {
    event.preventDefault();
    setDisabledButton(true);
    const isValid = userName.isValid.includes(false) || email.isValid.includes(false) || password.isValid.includes(false) || repeatPassword.isValid.includes(false);

    if (!isValid) {
      let response = await fetch("/register", requestOptions);
      let data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        props.setRegisterTour("basic");
        props.setErrorMessage("");
      } else props.setErrorMessage(data.result + "!");
    } else {
      props.setErrorMessage("please complete the form correctly!");
    }
    setDisabledButton(false);
  }

  function userNameHandler(event) {
    const letters = /^[a-zA-Z0-9]+$/.test(event.target.value),
      length = event.target.value.length >= 5 && event.target.value.length <= 20;

    setUserName({ ...userName, value: event.target.value, isValid: [letters, length] });
  }
  function firstNameHandler(event) {
    setFirstName({ ...firstName, value: event.target.value.trimStart() });
  }
  function lastNameHandler(event) {
    setLastName({ ...lastName, value: event.target.value.trimStart() });
  }
  function passwordHandler(event) {
    const number = /\d/.test(event.target.value);
    const special = /^.*[!@#$%^&*_].*$/.test(event.target.value);
    const small = /^.*[a-z].*$/.test(event.target.value);
    const capital = /^.*[A-Z].*$/.test(event.target.value);
    const length = event.target.value.length >= 5 && event.target.value.length <= 20;

    setPassword({ ...password, value: event.target.value, isValid: [capital, small, number, special, length] });
    if (event.target.value === repeatPassword.value) {
      setRepeatPassword({ ...repeatPassword, validateText: ["match"], isValid: [true] });
    } else {
      setRepeatPassword({ ...repeatPassword, validateText: ["not match"], isValid: [false] });
    }
  }
  function repeatPasswordHandler(event) {
    if (event.target.value === password.value) {
      setRepeatPassword({ ...repeatPassword, value: event.target.value, validateText: ["match"], isValid: [true] });
    } else {
      setRepeatPassword({ ...repeatPassword, value: event.target.value, validateText: ["not match"], isValid: [false] });
    }
  }
  function emailHandler(event) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
      setEmail({ ...email, value: event.target.value, validateText: ["valid Email"], isValid: [true] });
    } else {
      setEmail({ ...email, value: event.target.value, validateText: ["invalid Email Syntax"], isValid: [false] });
    }
  }

  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle px-5 bg-white register-form">
        <form onSubmit={registerUser}>
          <RegisterInputField required={true} type="text" name="user name" variable={userName} onChange={userNameHandler} setVariable={setUserName} />
          <RegisterInputField required={true} type="text" name="first name" variable={firstName} onChange={firstNameHandler} setVariable={setFirstName} />
          <RegisterInputField required={true} type="text" name="last name" variable={lastName} onChange={lastNameHandler} setVariable={setLastName} />
          <RegisterInputField required={true} type="password" name="password" variable={password} onChange={passwordHandler} setVariable={setPassword} />
          <RegisterInputField required={true} type="password" name="repeat password" variable={repeatPassword} onChange={repeatPasswordHandler} setVariable={setRepeatPassword} />
          <RegisterInputField required={true} type="email" name="email" variable={email} onChange={emailHandler} setVariable={setEmail} />

          <div className="input-parent flex-column">
            <button type="submit" className="mx-auto btn-submit" disabled={disabledButton}>
              Register
            </button>
            <a href="/login" className="mx-auto link">
              Have an Account? Login
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;

import { useState } from "react";
import BasicInformations from "../components/BasicInformations";
import RegisterForm from "../components/RegisterForm";
import ConfirmEmail from "../components/ConfirmEmail";

function Register() {
  const [registerTour, setRegisterTour] = useState("form");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <div className="position-relative vw-100 vh-100 fullback">
        <div className="position-absolute top-50 start-50 translate-middle ">
          <img src="/icon.png" alt="" className="position-absolute start-50 translate-middle icon" />
          {errorMessage !== "" && <div className="position-absolute start-50 translate-middle p-1 register-message">{errorMessage}</div>}
          {registerTour === "basic" ? <BasicInformations setErrorMessage={setErrorMessage} /> : registerTour === "form" ? <RegisterForm setRegisterTour={setRegisterTour} setErrorMessage={setErrorMessage} /> : <ConfirmEmail />}
        </div>
      </div>
    </>
  );
}

export default Register;

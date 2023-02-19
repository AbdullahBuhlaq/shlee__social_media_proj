function RegisterInputField(props) {
  const id = props.name.replace(/\s+/g, "");
  return (
    <>
      <div className="input-parent">
        <div>
          <label className="input-label" htmlFor={id}>
            {props.name}
          </label>
          <input required={props.required} type={props.type} className="mx-auto input-field" id={id} value={props.variable.value} onChange={(event) => props.onChange(event)} onFocus={() => props.setVariable({ ...props.variable, view: true })} onBlur={() => props.setVariable({ ...props.variable, view: false })} /> <br />
          {props.variable.validateText[0] !== "" && props.variable.view && (
            <>
              <div className="arrow"></div>
              <div className="validation-text">
                <>
                  {props.variable.validateText.map((element, index) => {
                    return (
                      <>
                        {props.variable.isValid[index] ? "✔" : "❌"}
                        <span key={index} className={props.variable.isValid[index] ? "true" : "rong"}>
                          {element}
                        </span>
                        <br />
                      </>
                    );
                  })}
                </>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default RegisterInputField;

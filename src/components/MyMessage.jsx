function MyMessage(props) {
  return (
    <div className="my-message d-flex flex-wrap align-self-end">
      <div>{props.text}</div>
      <div className="message-date d-flex justify-content-end align-items-end">{props.date}</div>
    </div>
  );
}

export default MyMessage;

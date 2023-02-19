function BasicPhoto(props) {
  return (
    <>
      {<div className={props.animate ? "waiting waiting-on" : "waiting"}></div>}
      <img className="profile-photo object-fit-scale" src={props.photo.value} alt="profile photo" />
      <label className="basic-profile-photo-label" htmlFor="basicInputPhoto">
        Select Profile Photo
      </label>
      <input className="basic-profile-photo" id="basicInputPhoto" type="file" onChange={(event) => props.onChange(event.target.files[0])} />
    </>
  );
}

export default BasicPhoto;

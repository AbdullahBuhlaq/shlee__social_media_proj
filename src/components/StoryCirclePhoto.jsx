function StoryCirclePhoto(props) {
  return (
    <>
      <div className="stories-line-item d-flex flex-column align-items-center">
        <img className="stories-line-photo object-fit-scale" src={props.photo} alt="story Photo" />
        <span>{props.userName}</span>
      </div>
    </>
  );
}

export default StoryCirclePhoto;

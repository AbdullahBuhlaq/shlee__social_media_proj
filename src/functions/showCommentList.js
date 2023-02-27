import requestOptions from "../constants/requestOptions";

async function showCommentList(commentIds, postId, friendIndex, postIndex, setCommentList) {
  let infoRequestOptions = {
    ...requestOptions,
    body: JSON.stringify({
      commentIds: commentIds,
    }),
  };
  const response = await fetch("/getCommentList", infoRequestOptions);
  const data = await response.json();
  setCommentList({ postId: postId, friendIndex: friendIndex, postIndex: postIndex, comments: data.result });
}

export default showCommentList;

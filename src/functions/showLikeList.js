const requestOptions = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: "",
};

async function showLikeList(fanIds, setLikeList) {
  let infoRequestOptions = {
    ...requestOptions,
    body: JSON.stringify({
      fanIds: fanIds,
    }),
  };
  const response = await fetch("/getLikeList", infoRequestOptions);
  const data = await response.json();
  setLikeList(data.result);
}

export default showLikeList;

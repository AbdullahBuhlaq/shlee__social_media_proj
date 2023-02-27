function calculateDate(date) {
  const betweenDate = new Date() - new Date(date);
  let result = Math.floor(betweenDate / 31104000000);
  if (result) return `${result} year${result > 1 ? "s" : ""} ago`;
  result = Math.floor(betweenDate / 2592000000);
  if (result) return `${result} month${result > 1 ? "s" : ""} ago`;
  result = Math.floor(betweenDate / 86400000);
  if (result) return `${result} day${result > 1 ? "s" : ""} ago`;
  result = Math.floor(betweenDate / 3600000);
  if (result) return `${result} hour${result > 1 ? "s" : ""} ago`;
  result = Math.floor(betweenDate / 60000);
  if (result) return `${result} minute${result > 1 ? "s" : ""} ago`;
  return "just now";
}

export default calculateDate;

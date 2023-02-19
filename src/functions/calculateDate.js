function calculateDate(date) {
  const postDate = new Date(date);
  const nowDate = new Date();
  let result = nowDate.getFullYear() - postDate.getFullYear();
  if (result) return `${result} year${result > 1 ? "s" : ""} ago`;
  result = nowDate.getMonth() - postDate.getMonth();
  if (result) return `${result} month${result > 1 ? "s" : ""} ago`;
  result = nowDate.getDay() - postDate.getDay();
  if (result) return `${result} day${result > 1 ? "s" : ""} ago`;
  result = nowDate.getHours() - postDate.getHours();
  if (result) return `${result} hour${result > 1 ? "s" : ""} ago`;
  result = nowDate.getMinutes() - postDate.getMinutes();
  if (result) return `${result} minute${result > 1 ? "s" : ""} ago`;
  return "just now";
}

export default calculateDate;

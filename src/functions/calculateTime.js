function calculateTime(date) {
  const finalDate = new Date(date);
  const hours = parseInt(finalDate.getHours() + 12) % 12;
  const minutes = finalDate.getMinutes();
  return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + (hours >= 12 ? " PM" : " AM");
}

export default calculateTime;

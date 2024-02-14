const addHours = (date, hours) => {
  const dateCopy = new Date(date);

  dateCopy.setHours(dateCopy.getHours() + hours);

  return dateCopy;
}

const formatFullDate = (date = new Date()) => {
  const newDate = new Date(date);
  return newDate.toLocaleString();
}

const formatDate = (date = new Date()) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
}

const formatTime = (date = new Date()) => {
  const newDate = new Date(date);
  return newDate.toLocaleTimeString().slice(0, 5);
}

export { addHours, formatFullDate, formatDate, formatTime };
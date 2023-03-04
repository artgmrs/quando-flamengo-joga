  const addHours = (date, hours) => {
    const dateCopy = new Date(date);
  
    dateCopy.setHours(dateCopy.getHours() + hours);
  
    return dateCopy;
  }

  const formatDate = (date = new Date()) =>  {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  }

  export { addHours, formatDate };

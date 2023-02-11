const generateGoogleCalendarLink = ({dados, date}) => {

  if (dados) {
    const baseUrl = 'https://calendar.google.com/calendar/render';
    
    const title = `Flamengo x ${dados.nomeRival}`;
    
    const startDate = date.toISOString().replace(/[^a-zA-Z0-9]/g, '');
    const endDate = addHours(date, 2).toISOString().replace(/[^a-zA-Z0-9]/g, '');
    const timeZone = 'America/Sao_Paulo';
  
    const url = `${baseUrl}?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&ctz=${timeZone}`
  
    return url;
  }

  return '';
}

export { generateGoogleCalendarLink };
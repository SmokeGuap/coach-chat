export const formateDate = (date: string | number) => {
  const dateObject = new Date(date);

  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedDate = `${formattedHours}:${formattedMinutes}`;

  return formattedDate;
};

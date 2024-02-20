export const numberToTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // Add leading zero if seconds are less than 10
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${formattedSeconds}`;
};

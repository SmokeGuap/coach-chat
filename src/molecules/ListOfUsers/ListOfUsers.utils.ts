export const formateUserCount = (currentCountUsers: number, maxCountUsers: number) => {
  const userCount = `${currentCountUsers} из ${maxCountUsers} участников`;

  return userCount;
};

import { TResultOfUser, TMessage } from 'src/context/WebSocketContext/WebSocketContext.types';

export const formateResult = (results: TResultOfUser[]) => {
  results.sort(function (a, b) {
    return a.place - b.place;
  });

  return (
    <>
      <p>Результаты тренинга:</p>
      {results.map((item, index) => (
        <p key={index}>
          {item.nickname} — {item.points}
        </p>
      ))}
    </>
  );
};

export const sortMessages = (messages: TMessage[]) => {
  const sortMessages = messages.sort((a: { id: number }, b: { id: number }) => b.id - a.id);

  return sortMessages;
};

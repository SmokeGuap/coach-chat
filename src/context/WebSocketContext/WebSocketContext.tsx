import { FC, createContext, useContext, useEffect, useState, useRef } from 'react';

import { API_URL_WEBSOCKET } from 'src/constants';

import { IWebSocketContext, IWebSocketContextProps } from './WebSocketContext.types';

const WebSocketContext = createContext<IWebSocketContext>({
  socket: null,
  data: {
    current_round: 0,
    is_allowed_to_send_message: null,
    max_round_time: 0,
    max_rounds_count: 0,
    max_students_count: 0,
    messages: [],
    training_start_status: '',
    type: '',
    users: [],
  },
  isReady: false,
});

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

const WebSocketProvider: FC<IWebSocketContextProps> = (props) => {
  const { roomId, token, children } = props;
  const [isReady, setIsReady] = useState(false);
  const [reconnect, setReconnect] = useState(false);
  const [data, setData] = useState<any>();

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`${API_URL_WEBSOCKET}${roomId}/?token=${token}`);

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => {
      setIsReady(false);
      setTimeout(() => {
        setReconnect(!reconnect);
      }, 5000);
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setData(data);
    };

    ws.current = socket;

    return () => {
      if (socket.readyState === 1) {
        socket.close();
      }
    };
  }, [reconnect]);

  return (
    <WebSocketContext.Provider value={{ socket: ws.current, data, isReady }}>{children}</WebSocketContext.Provider>
  );
};

export default WebSocketProvider;

import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("ws://localhost:8000");
    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export { SocketProvider, SocketContext };

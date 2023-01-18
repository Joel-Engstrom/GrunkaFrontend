import { io } from "socket.io-client";

const Chat = ({}) => {
  const socket = io("ws://localhost:8000");

  socket.emit("client-message", "Testing!");
  socket.on("server-message", (msg) => console.info(`Server sent: ${msg}`));

  return <></>;
};
export default Chat;

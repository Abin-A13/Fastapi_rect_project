const socket = new WebSocket("ws://127.0.0.1:8000/ws");

socket.onopen = () => {
  console.log("WebSocket connected");
};

socket.onclose = () => {
  console.log("WebSocket disconnected");
};

const sendMessage = (data: any) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  }
};

export { socket, sendMessage }; // Export both socket and sendMessage function

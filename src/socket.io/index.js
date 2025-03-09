import { Server } from "socket.io"
import { AuthSocket } from "./middleware/authenticate.socket.js";
import { sendMessage } from "./chat/chat.service.js";

export const initSocket = function (server) {
    const io = new Server(server, {cors: {
        origin: "*", // أو أي بورت تعمل عليه الواجهة الأمامية
        methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        credentials: true
      }});
    // Middleware
    io.use(AuthSocket);
    // connection
    io.on("connection", (socket) => {
        socket.on("sendMessage", sendMessage(socket, io))

        socket.on("disconnect", () => {
            console.log(`${socket.firstName} disconnected`);
            
        })
    })
}
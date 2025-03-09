import { Chat } from "../../db/models/index.js";

export const sendMessage = function (socket, io) {
    return async (data) => {
        try {
            const { message, destId } = data;

            // إرسال الرسالة إلى المستقبل
            socket.to(destId).emit("receiveMessage", { message });
            socket.emit("successMessage", { message });

            // البحث عن المحادثة
            let chat = await Chat.findOne({ users: { $all: [destId, socket.id] } });

            if (!chat) {
                // إنشاء محادثة جديدة في حالة عدم وجودها
                chat = await Chat.create({
                    users: [socket.id, destId],
                    messages: [],
                });
            }

            // إضافة الرسالة إلى المحادثة
            chat.messages.push({ senderId: socket.id, message });
            await chat.save();

            // إرسال تأكيد النجاح
            socket.to(destId).emit("successMessage", { message, from: socket.id });

        } catch (error) {
            console.error("Error in sendMessage:", error);
            socket.emit("errorMessage", { error: "Failed to send message" });
        }
    };
};

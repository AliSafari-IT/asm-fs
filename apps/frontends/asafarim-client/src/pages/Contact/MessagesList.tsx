import { IMessage } from "@site/src/interfaces/IMessage";
import React, { useEffect, useState } from "react";

const MessagesList = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("https://localhost:44337/api/messages");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: IMessage[] = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      {messages.length > 0 ? (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <strong>{message.subject ?? "No Subject"}</strong> - {message.content}
              <br />
              <small>Sent by: {message.userName} on {new Date(message.dateSent).toLocaleString()}</small>
              <br />
              {message.isRead ? "Read" : "Unread"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages to display.</p>
      )}
    </div>
  );
};

export default MessagesList;

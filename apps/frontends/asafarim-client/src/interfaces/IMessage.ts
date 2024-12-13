// src/interfaces/IMessage.ts

export interface IMessage {
    id: string; // Represents Guid
    userName: string; // Email or Username of the sender
    content: string; // The actual message content
    dateSent: string; // Timestamp of when the message was sent, using ISO string
    subject?: string; // Optional subject for the message
    isRead: boolean; // Indicates if the message has been read
  }
  
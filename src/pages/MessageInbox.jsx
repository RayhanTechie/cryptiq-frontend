// src/pages/MessageInbox.jsx
import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function MessageInbox() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await api.get("/messages/inbox");
        setMessages(res.data);
      } catch (err) {
        toast.error("Failed to load inbox");
      }
    };

    fetchInbox();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">📥 Inbox</h1>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className="bg-base-200 p-4 rounded shadow border border-base-300"
            >
              <p className="font-semibold">From: {msg.senderEmail}</p>
              <p>Message: {atob(msg.content)}</p>
              <Link
                to={`/reply/${msg.id}`}
                className="btn btn-sm btn-primary mt-2"
              >
                Reply
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

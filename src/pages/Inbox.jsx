import { useEffect, useState } from "react";
import api from "../api/api.js";
import { jwtDecode } from "jwt-decode";

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [replyText, setReplyText] = useState({});
  const [sendingReply, setSendingReply] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const email = decoded.sub || decoded.email;
    setUserEmail(email);

    api
      .get(`/messages/received?email=${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch inbox", err);
        setLoading(false);
      });
  }, []);

  const handleReplyChange = (messageId, text) => {
    setReplyText((prev) => ({ ...prev, [messageId]: text }));
  };

  const handleSendReply = async (recipientEmail, messageId) => {
    const token = localStorage.getItem("token");
    const text = replyText[messageId];
    if (!text) return;

    setSendingReply((prev) => ({ ...prev, [messageId]: true }));

    try {
      await api.post(
        "/messages/send",
        { recipientEmail, content: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Reply sent successfully!");
      setReplyText((prev) => ({ ...prev, [messageId]: "" }));
    } catch (err) {
      console.error("Reply failed", err);
      alert("Failed to send reply.");
    } finally {
      setSendingReply((prev) => ({ ...prev, [messageId]: false }));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Inbox for {userEmail}</h2>
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul className="space-y-6">
          {messages.map((msg) => (
            <li key={msg.id} className="border p-4 rounded shadow bg-base-100">
              <p>
                <strong>From:</strong> {msg.senderEmail}
              </p>
              <p>
                <strong>Message:</strong> {msg.encryptedText}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(msg.timestamp).toLocaleString()}
              </p>

              <div className="mt-4">
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Type your reply..."
                  value={replyText[msg.id] || ""}
                  onChange={(e) => handleReplyChange(msg.id, e.target.value)}
                ></textarea>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleSendReply(msg.senderEmail, msg.id)}
                  disabled={sendingReply[msg.id]}
                >
                  {sendingReply[msg.id] ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

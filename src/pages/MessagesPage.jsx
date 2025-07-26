import { useEffect, useState } from "react";
import api from "../api/api.js";
import toast from "react-hot-toast";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState("inbox");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/api/messages/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(res.data)) {
        setMessages(res.data);
      } else {
        setMessages([]);
      }
    } catch (error) {
      toast.error("Failed to fetch messages");
      setMessages([]);
    }
  };

  const sendReply = async (toEmail) => {
    if (!replyText.trim()) {
      toast.error("Reply message cannot be empty.");
      return;
    }

    try {
      await api.post(
        "/api/messages/send",
        {
          recipientEmail: toEmail,
          content: replyText,
          
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Reply sent!");
      setReplyText("");
      setReplyTo(null);
      fetchMessages();
    } catch (error) {
      toast.error("Failed to send reply.");
      console.error("Reply error:", error);
    }
  };

  useEffect(() => {
    if (userEmail && token) {
      fetchMessages();
    }
  }, [userEmail]);

  const filteredMessages =
    Array.isArray(messages) && messages.length > 0
      ? tab === "inbox"
        ? messages.filter((msg) => msg.recipientEmail === userEmail)
        : messages.filter((msg) => msg.senderEmail === userEmail)
      : [];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">Messages</h1>
      <p className="text-center text-gray-500 mb-4">Logged in as: <span className="font-semibold">{userEmail}</span></p>

      <div className="tabs justify-center mb-6">
        <button
          className={`tab tab-bordered ${tab === "inbox" ? "tab-active" : ""}`}
          onClick={() => setTab("inbox")}
        >
          Inbox
        </button>
        <button
          className={`tab tab-bordered ${tab === "sent" ? "tab-active" : ""}`}
          onClick={() => setTab("sent")}
        >
          Sent
        </button>
      </div>

      {filteredMessages.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredMessages.map((msg) => (
            <li key={msg.id} className="p-4 bg-base-200 rounded shadow">
              <div className="text-sm text-gray-400 mb-1">
                {tab === "inbox" ? (
                  <>From: {msg.senderEmail}</>
                ) : (
                  <>To: {msg.recipientEmail}</>
                )}
              </div>
              <div className="text-base break-words">{msg.encryptedText}</div>
              <div className="text-right text-xs text-gray-500 mt-2">
                {msg.timestamp
                  ? new Date(msg.timestamp).toLocaleString()
                  : "No timestamp"}
              </div>

              {/* Reply UI in Inbox tab */}
              {tab === "inbox" && (
                <div className="mt-2">
                  <button
                    onClick={() => setReplyTo(msg.senderEmail)}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Reply
                  </button>

                  {replyTo === msg.senderEmail && (
                    <div className="mt-2">
                      <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Type your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <button
                        className="btn btn-sm btn-success mt-2"
                        onClick={() => sendReply(msg.senderEmail)}
                      >
                        Send Reply
                      </button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

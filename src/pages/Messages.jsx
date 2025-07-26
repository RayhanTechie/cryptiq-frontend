import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Messages = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);

  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");

  // Fetch messages for current user
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/messages/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages", err);
      toast.error("Failed to fetch messages.");
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchMessages();
    }
  }, []);

  // Handle sending a message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!recipientEmail || !messageText) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/messages/send",
        {
          senderEmail: userEmail,
          recipientEmail,
          encryptedText: messageText, // backend will encrypt it
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Message sent!");
      setMessageText("");
      setRecipientEmail("");
      fetchMessages();
    } catch (err) {
      console.error("Send error:", err);
      toast.error("Error sending message.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Secure Messaging</h2>

      <form onSubmit={handleSend} className="space-y-4 max-w-md">
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Recipient's Email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Enter your message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-full">
          Send Message
        </button>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-2">Your Messages</h3>
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="p-4 border rounded bg-base-200">
                <p><strong>From:</strong> {msg.senderEmail}</p>
                <p><strong>To:</strong> {msg.recipientEmail}</p>
                <p><strong>Message:</strong> {msg.encryptedText}</p>
                <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;

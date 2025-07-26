import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";

export default function SendMessage() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to send a message.");
      return;
    }

    setSending(true);
    try {
      const res = await api.post(
        "/messages/send",
        {
          recipientEmail,
          content: message, // 🔐 No need for btoa()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Message sent!");
      setMessage("");
      setRecipientEmail("");
      navigate("/send"); // 👈 Make sure route is correct
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Send Encrypted Message</h2>
      <form onSubmit={handleSend}>
        <div className="mb-4">
          <label className="label">Recipient Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="label">Message</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={sending}
        >
          {sending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

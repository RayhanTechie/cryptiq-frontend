// src/pages/ReplyMessage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

export default function ReplyMessage() {
  const { id } = useParams(); // message ID
  const [originalMsg, setOriginalMsg] = useState(null);
  const [reply, setReply] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOriginal = async () => {
      try {
        const res = await api.get(`/messages/${id}`);
        setOriginalMsg(res.data);
      } catch (err) {
        toast.error("Failed to load message.");
      }
    };

    fetchOriginal();
  }, [id]);

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      const encryptedReply = btoa(reply);
      await api.post("/messages/send", {
        recipientEmail: originalMsg.senderEmail,
        content: encryptedReply,
      });

      toast.success("Reply sent!");
      navigate("/messages");
    } catch (err) {
      toast.error("Reply failed.");
    }
  };

  if (!originalMsg) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-base-200 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Reply to: {originalMsg.senderEmail}</h2>
      <p className="mb-2"><strong>Original Message:</strong> {atob(originalMsg.content)}</p>

      <form onSubmit={handleReply}>
        <textarea
          className="textarea textarea-bordered w-full mb-4"
          rows="4"
          placeholder="Write your reply..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="btn btn-primary w-full">
          Send Reply
        </button>
      </form>
    </div>
  );
}

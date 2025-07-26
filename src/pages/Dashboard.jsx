import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Inbox from "./Inbox"; // ✅ import Inbox component

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const email = decoded.sub || decoded.email;

    setUserEmail(email);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      <p className="text-lg text-center mb-6 text-gray-600">Logged in as: {userEmail}</p>

      {/* ✅ Show Inbox directly in Dashboard */}
      <Inbox />
    </div>
  );
}

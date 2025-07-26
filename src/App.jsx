import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import SendMessage from "./pages/SendMessage";
import MessagesPage from "./pages/MessagesPage";
import Inbox from "./pages/Inbox";
import MessageInbox from "./pages/MessageInbox";
import ReplyMessage from "./pages/ReplyMessage";

// ✅ Extract your app logic into a child component
function AppRoutes() {
  const location = useLocation();
  const hideNavbarPaths = ["/"]; // Hide navbar on home page

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/send" element={
          <ProtectedRoute><SendMessage /></ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute><MessagesPage /></ProtectedRoute>
        } />
        <Route path="/inbox" element={
          <ProtectedRoute><Inbox /></ProtectedRoute>
        } />
        <Route path="/messagebox" element={
          <ProtectedRoute><MessageInbox /></ProtectedRoute>
        } />
        <Route path="/reply/:id" element={
          <ProtectedRoute><ReplyMessage /></ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

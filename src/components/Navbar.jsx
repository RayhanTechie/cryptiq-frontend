import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail"); // optional
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Cryptiq</Link>
      </div>

      <div className="flex-none gap-2">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>
            
            <Link to="/send" className="btn btn-ghost">Send</Link> {/* ✅ added Send */}
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-ghost">Register</Link>
          </>
        )}

        <select
          className="select select-bordered"
          defaultValue="Pick theme"
          onChange={(e) =>
            document.documentElement.setAttribute("data-theme", e.target.value)
          }
        >
          <option disabled>Pick theme</option>
          <option>light</option>
          <option>dark</option>
          <option>cupcake</option>
          <option>cyberpunk</option>
          <option>valentine</option>
        </select>
      </div>
    </div>
  );
}

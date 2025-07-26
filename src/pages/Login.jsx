import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/api.js";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await api.post("http://localhost:8080/api/auth/login", formData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      toast.success("✅ Login successful!");
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data); // shows your custom error from backend
      } else {
        toast.error("❌ Something went wrong. Please try again.");
      }
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white shadow-xl rounded-2xl px-8 pt-6 pb-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
        <input
          type="email"
          name="email"
          className="input input-bordered w-full"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
        <input
          type="password"
          name="password"
          className="input input-bordered w-full"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Login
        </button>
      </div>
    </form>
  </div>
  );
};

export default Login;

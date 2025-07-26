import React from "react";
import { Link } from "react-router-dom";
import { LockClosedIcon, InboxIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 flex flex-col">
      {/* Header Hero */}
      <header className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-800 leading-tight mb-4 animate-fade-in-up">
          Welcome to <span className="text-blue-600">Cryptiq</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mb-6 animate-fade-in-up delay-75">
          A secure end-to-end encrypted messaging platform built with ❤️ using Spring Boot + React.
        </p>
        <div className="flex gap-4 animate-fade-in-up delay-100">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-full shadow-md transition"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Feature Highlights */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Why Choose Cryptiq?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <LockClosedIcon className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
            <p className="text-gray-600">
              Messages are secured using AES encryption and JWT authentication to ensure privacy.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <InboxIcon className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Inbox & Replies</h3>
            <p className="text-gray-600">
              Organize sent and received messages efficiently, just like Gmail but with tighter security.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <ShieldCheckIcon className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Built for Developers</h3>
            <p className="text-gray-600">
              Powered by Spring Boot, MongoDB, and React — designed with clean code and modern stack.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-blue-700">Cryptiq</span> — Built by Mohamed Rayhan
      </footer>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaUser, FaComment, FaArrowLeft } from "react-icons/fa";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (you can replace this with an API call)
    console.log("Feedback submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <FaEnvelope className="mr-2" /> Feedback
        </h1>

        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Thank you for your feedback!
            </h2>
            <p className="text-gray-600 mb-6">
              We appreciate your input and will get back to you if necessary.
            </p>
            <Link
              to="/"
              className="text-blue-500 hover:text-blue-700 font-medium flex items-center justify-center"
            >
              <FaArrowLeft className="mr-2" /> Back to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <FaUser className="inline-block mr-2" /> Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <FaEnvelope className="inline-block mr-2" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <FaComment className="inline-block mr-2" /> Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
                placeholder="Enter your feedback or suggestions"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;

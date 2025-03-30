"use client";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const BirthdayForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message || !image) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);
    formData.append("image", image);
    console.log("Form Data:", formData);
    try {
      const response = await axios.post("http://localhost:4001/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response:", response);
      if (response.data.success) {
        setSubmitted(true);
        setSuccessMessage(response.data.message);
        setUploadedImage(response.data.image);
      }
    } catch (error) {
      console.error("Error submitting wish:", error);
      setSuccessMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 p-6">
      {!submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
            🎂 Enter Birthday Wish 🎉
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="p-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <textarea
              placeholder="Enter your birthday message"
              className="p-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              className="p-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
            <button
              onClick={handleSubmit}
              className="py-3 px-6 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-all duration-300"
            >
              Send Wish
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center"
        >
          <h2 className="text-3xl font-bold text-purple-700">🎉 Congratulations your link is ready 🎂</h2>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-5 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Submit Another Wish
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default BirthdayForm;


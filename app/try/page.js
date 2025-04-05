'use client'
import React, { useState } from "react";
import axios from "axios";
// import { uploadImageToCloudinary } from "../utils/cloudinary";

const predefinedSkills = [
  "JavaScript", "React", "Node.js", "Express.js", "MongoDB",
  "MySQL", "TypeScript", "Tailwind CSS", "Next.js", "Python"
];

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    skills: []
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
    //   const imageUrl = await uploadImageToCloudinary(file);
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };

  const handleSkillChange = (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(value)
        ? prev.skills.filter((skill) => skill !== value)
        : [...prev.skills, value]
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/profile", formData);
      console.log("Profile saved:", response.data);
    } catch (error) {
      console.error("Error saving profile", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white text-black rounded-lg shadow-md w-96">
      <label className="block mb-2 font-semibold">Name</label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-2 border rounded-md mb-4"
      />

      <label className="block mb-2 font-semibold">Email</label>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-2 border rounded-md mb-4"
      />

      <label className="block mb-2 font-semibold">Profile Image</label>
      <input type="file" onChange={handleImageUpload} className="mb-4" />
      {formData.profileImage && (
        <img src={formData.profileImage} alt="Profile Preview" className="w-24 h-24 mt-2 rounded-full" />
      )}

      <label className="block mb-2 font-semibold">Skills</label>
      <div className="grid grid-cols-2 gap-2">
        {predefinedSkills.map((skill) => (
          <label key={skill} className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              value={skill}
              checked={formData.skills.includes(skill)}
              onChange={handleSkillChange}
              className="form-checkbox text-blue-500"
            />
            <span>{skill}</span>
          </label>
        ))}
      </div>

      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600">
        Save Profile
      </button>
    </form>
  );
};

export default ProfileForm;

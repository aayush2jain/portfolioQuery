'use client'
import React, { useState } from "react";
import axios from "axios";

const predefinedSkills = ["JavaScript", "Python", "React", "Node.js", "MongoDB", "SQL", "CSS", "HTML", "TypeScript", "Docker"];

const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: null,
    skills: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );
      setFormData((prevData) => ({ ...prevData, profileImage: response.data.secure_url }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSkillChange = (skill) => {
    setFormData((prevData) => {
      const skills = prevData.skills.includes(skill)
        ? prevData.skills.filter((s) => s !== skill)
        : [...prevData.skills, skill];
      return { ...prevData, skills };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/submit", formData);
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {formData.profileImage && <img src={formData.profileImage} alt="Profile Preview" width="100" />}
      
      <div>
        <label>Select Your Skills:</label>
        <div>
          {predefinedSkills.map((skill) => (
            <label key={skill}>
              <input
                type="checkbox"
                checked={formData.skills.includes(skill)}
                onChange={() => handleSkillChange(skill)}
              />
              {skill}
            </label>
          ))}
        </div>
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default MultiStepForm;

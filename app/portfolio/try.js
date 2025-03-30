'use client'
import React, { useState } from "react";
import axios from "axios";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [projects, setProjects] = useState([
    { name: "", description: "", image: "", demoLink: "" },
  ]);
  const [hobbies, setHobbies] = useState([""]);
  const [roles, setRoles] = useState([""]);
  
  const handleChangeProject = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...projects];
    updatedProjects[index][name] = value;
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([...projects, { name: "", description: "", image: "", demoLink: "" }]);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    products: [{ name: "", description: "", price: "", image: "" }],
  });


//   const handleChangehobby = (e, index, type) => {
//     const newData = type === "hobby" ? [...hobbies] : [...roles];
//     newData[index] = e.target.value;
//     type === "hobby" ? setHobbies(newData) : setRoles(newData);
//   };

  const addField = (type) => {
    type === "hobby" ? setHobbies([...hobbies, ""]) : setRoles([...roles, ""]);
  };
  const handleChange = (e, index = null, field = null) => {
    if (index !== null && field) {
      const updatedProducts = [...formData.products];
      updatedProducts[index][field] = e.target.value;
      setFormData({ ...formData, products: updatedProducts });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { name: "", description: "", price: "", image: "" }],
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/submit", formData);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="form-container">
      {step === 1 && (
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-black mb-6 text-center">Personal Information</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left Column */}
      <div>
        <label className="block text-black font-semibold mb-1">Name:<span className="text-red-600">*</span></label>
        <input className="w-full p-2 mb-3 border text-black border-gray-300 rounded" name="name" placeholder="Enter your name" onChange={handleChange} />

        <label className="block text-black font-semibold mb-1">Email:<span className="text-red-600">*</span></label>
        <input className="w-full p-2 mb-3 border text-black border-gray-300 rounded" name="email" placeholder="Enter your email" onChange={handleChange} />

         <label className="block text-black font-medium mb-1">Github Profile:</label>
        <input className="w-full p-2 mb-3 border  text-black border-gray-300 rounded" name="github" placeholder="GitHub Profile Link" onChange={handleChange} />

    

        <label className="block text-black font-medium mb-1">Twitter Profile:</label>
        <input className="w-full p-2 mb-3 border  text-black border-gray-300 rounded" name="twitter" placeholder="Twitter Profile Link" onChange={handleChange} />

         <label className="block text-black font-medium mb-1">Resume Link:(optional)</label>
        <input className="w-full p-2 mb-3 border text-black border-gray-300 rounded" type="url" name="resume" placeholder="Resume Link (Google Drive)" onChange={handleChange} />
      </div>

      {/* Right Column */}
      <div>
        <label className="block text-black font-semibold mb-1">Phone:<span className="text-red-600">*</span></label>
        <input className="w-full p-2 mb-3 text-black border border-gray-300 rounded" name="phone" placeholder="Enter your phone number" onChange={handleChange} />
        <label className="block text-black font-semibold mb-1">LinkedIn Profile:<span className="text-red-600">*</span></label>
        <input className="w-full p-2 mb-3 border text-black border-gray-300 rounded" name="linkedin" placeholder="LinkedIn Profile Link" onChange={handleChange} />
       
        <label className="block text-black font-medium mb-1">Instagram Profile:</label>
        <input className="w-full p-2 mb-3 border text-black border-gray-300 rounded" name="instagram" placeholder="Instagram Profile Link" onChange={handleChange} />

        <label className="block text-black font-medium mb-1">Pinterest Profile:</label>
        <input className="w-full p-2 mb-3 border text-black border-gray-300 rounded" name="pinterest" placeholder="Pinterest Profile Link" onChange={handleChange} />

       

        {/* <label className="block text-black font-medium mb-1">Profile Picture</label>
        <input 
          className="w-full p-2 mb-3 border border-gray-300 rounded bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 transition" 
          type="file" name="userImage" accept="image/*" onChange={handleChange} 
        /> */}
      </div>
    </div>

    <button className="w-full bg-blue-600 text-white py-2 rounded mt-6 hover:bg-blue-700 transition" onClick={nextStep}>
      Next
    </button>
  </div>
</div>

      )}
      {step === 2 && (
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Professional Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div>
          <label className="block text-black font-semibold mb-1">Profession:<span className="text-red-600">*</span></label>
          <input className="w-full p-2 mb-3 border  text-black  border-gray-300 rounded" name="profession" placeholder="i.e webdesigning,developement" />

            <label className="block text-black font-medium mb-1">Skills:</label>
            <input className="w-full p-2 mb-3 border  text-black  border-gray-300 rounded" name="skills" placeholder="i.e figma,c++,vercel" />

            <label className="block text-black font-medium mb-1">Tech Stack:</label>
            <input className="w-full p-2 mb-3 border  text-black  border-gray-300 rounded" name="tech_stack" placeholder="i.e reactjs,nextjs,framer" />

        

            <label className="block text-black font-medium mb-1">User Quote:</label>
            <input className="w-full p-2 mb-3 border text-black  border-gray-300 rounded" name="user_quote" placeholder="A quote that defines you" />
          </div>

          {/* Right Column */}
          <div>
            <label className="block text-black font-semibold mb-1">About You:<span className="text-red-600">*</span></label>
            <textarea className="w-full p-2 mb-3  text-black  border border-gray-300 rounded h-24" name="about" placeholder="Hi Everyone, I am Soumyajit Behera from Bhubaneswar, India.
I am currently employed as a software developer at Juspay.
I have completed Integrated MSc (IMSc) in Maths and Computing at BIT Mesra.
"></textarea>

            {/* Hobbies Section */}
            <label className="block text-black font-medium mb-1">Hobbies:</label>
            {hobbies.map((hobby, index) => (
              <input key={index} className="w-full p-2  text-black  mb-2 border border-gray-300 rounded" placeholder={`playing chess`} value={hobby} onChange={(e) => handleChangehobby(e, index, "hobby")} />
            ))}
            <button className="bg-black text-white px-4 py-1 rounded mb-3" onClick={() => addField("hobby")}>+ Add Hobby</button>

            {/* User Roles Section */}
            <label className="block text-black font-medium mb-1">User Roles:</label>
            {roles.map((role, index) => (
              <input key={index} className="w-full text-black  p-2 mb-2 border border-gray-300 rounded" placeholder={`i.e frontendEngineer`} value={role} onChange={(e) => handleChange(e, index, "role")} />
            ))}
            <button className="bg-black text-white px-4 py-1 rounded" onClick={() => addField("role")}>+ Add Role</button>
          </div>
        </div>

        <div className="flex justify-between mt-6">
              <button className="bg-gray-600 text-white px-6 py-2 rounded" onClick={prevStep}>
                Prev
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition" onClick={nextStep}>
                Next
              </button>
            </div>
      </div>
    </div>
      )}

      {step === 3 && (
        <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-4xl p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Project Details
        </h2>

        {projects.map((project, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 border border-gray-300 rounded">
            {/* Left Column */}
            <div>
              <label className="block text-black font-semibold mb-1">Project Name:<span className="text-red-600">*</span></label>
              <input
                className="w-full p-2 mb-3 border text-black border-gray-300 rounded"
                name="name"
                placeholder="Enter project name"
                value={project.name}
                onChange={(e) => handleChangeProject(index, e)}
              />

              <label className="block text-black font-medium mb-1">Project Image</label>
              <input
                type="file"
                className="w-full p-2 mb-3 border border-gray-300 rounded"
                name="image"
                onChange={(e) => handleChangeProject(index, e)}
              />
            </div>

            {/* Right Column */}
            <div>
              <label className="block text-black font-semibold mb-1">Project Description:<span className="text-red-600">*</span></label>
              <textarea
                className="w-full  text-black p-2 mb-3 border border-gray-300 rounded h-24"
                name="description"
                placeholder="Describe your project"
                value={project.description}
                onChange={(e) => handleChangeProject(index, e)}
              />

              <label className="block text-black font-medium mb-1">Demo Link</label>
              <input
                className="w-full text-black p-2 mb-3 border border-gray-300 rounded"
                name="demoLink"
                placeholder="Enter demo link (if any)"
                value={project.demoLink}
                onChange={(e) => handleChangeProject(index, e)}
              />
            </div>
          </div>
        ))}

        <button className="bg-black text-white px-4 py-2 rounded w-full mb-4" onClick={addProject}>
          + Add Project
        </button>

        <div className="flex justify-between mt-6">
              <button className="bg-gray-600 text-white px-6 py-2 rounded" onClick={prevStep}>
                Prev
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition" onClick={handleSubmit}>
                Submit
              </button>
            </div>
      </div>
    </div>
      )}
    </div>
  );
};

export default MultiStepForm;



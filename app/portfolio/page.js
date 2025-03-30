'use client'
import React, { useState } from "react";
import axios from "axios";
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userId,setuserId] = useState('');
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    twitter: "",
    instagram: "",
    pinterest: "",
    resume: "",

    // Professional Information
    profession: "",
    skills: "",
    tech_stack: "",
    user_quote: "",
    about: "",
    hobbies: [""],
    roles: [""],

    // Projects
    projects: [
      {
        name: "",
        description: "",
        demoLink: "",
        image: null,
      },
    ],
  });

  // Handles input changes for regular fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handles dynamic array fields like hobbies and roles
  const handleArrayChange = (index, e, field) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = e.target.value;
    setFormData({ ...formData, [field]: updatedArray });
  };
  

  // Add a new field dynamically for hobbies/roles
  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  // Handles project-specific input changes
  const handleChangeProject = (index, e) => {
    const { name, value, files } = e.target;
    const updatedProjects = [...formData.projects];
    
    if (name === "image") {
      updatedProjects[index][name] = files[0]; // Store image file
    } else {
      updatedProjects[index][name] = value;
    }

    setFormData({ ...formData, projects: updatedProjects });
  };

  // Add a new project
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { name: "", description: "", demoLink: "", image: null }],
    });
  };
  // Upload image to Cloudinary and return URL
  const uploadImageToCloudinary = async (file) => {
    const uploadPreset = "portfolio";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset",uploadPreset); // Replace with your Cloudinary preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dp9m5le12/image/upload",
        formData
      );
      return response.data.secure_url; // Return Cloudinary URL
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form Data:", formData);
    try {
      // Upload images to Cloudinary first, then update formData
      const uploadedProjects = await Promise.all(
        formData.projects.map(async (project) => {
          if (project.image) {
            const imageUrl = await uploadImageToCloudinary(project.image);
            return { ...project, image: imageUrl }; // Replace file with URL
          }
          return project; // Keep as is if no image
        })
      );

      const finalFormData = { ...formData, projects: uploadedProjects };

      // Send final form data to backend
      const response = await axios.post("https://portfolioback-kappa.vercel.app/user/submit", finalFormData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", response);
      if (response.data.success) {
        console.log("✅ Form submitted successfully!");
        setuserId(response.data.data.userId);
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
    }
    finally{
      setLoading(false);
    }
  };
  
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

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
      <input className="w-full p-2 mb-3 border text-black border-gray-300 rounded" required autoComplete="name" name="name" placeholder="Enter your name" onChange={handleChange} />

      <label className="block text-black font-semibold mb-1">Email:<span className="text-red-600">*</span></label>
      <input className="w-full p-2 mb-3 border text-black border-gray-300 rounded" required autoComplete="email" name="email" placeholder="Enter your email" onChange={handleChange} />

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
      <input className="w-full p-2 mb-3 text-black border border-gray-300 rounded" name="phone" required autoComplete="phone" placeholder="Enter your phone number" onChange={handleChange} />
      <label className="block text-black font-semibold mb-1">LinkedIn Profile:<span className="text-red-600">*</span></label>
      <input className="w-full p-2 mb-3 border text-black border-gray-300 rounded" name="linkedin" required autoComplete="linkedin" placeholder="LinkedIn Profile Link" onChange={handleChange} />
     
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
        <input onChange={handleChange} required   className="w-full p-2 mb-3 border  text-black  border-gray-300 rounded" name="profession" placeholder="i.e webdesigning,developement" />

          <label className="block text-black font-medium mb-1">Skills:</label>
          <input onChange={handleChange} className="w-full p-2 mb-3 border  text-black  border-gray-300 rounded" name="skills" placeholder="i.e figma,c++,vercel" />

          <label className="block text-black font-medium mb-1">Tech Stack:</label>
          <input onChange={handleChange} className="w-full p-2 mb-3 border  text-black  border-gray-300 rounded" name="tech_stack" placeholder="i.e reactjs,nextjs,framer" />

      

          <label className="block text-black font-medium mb-1">User Quote:</label>
          <input onChange={handleChange} className="w-full p-2 mb-3 border text-black  border-gray-300 rounded" name="user_quote" placeholder="A quote that defines you" />
        </div>

        {/* Right Column */}
        <div>
          <label className="block text-black font-semibold mb-1">About You:<span className="text-red-600">*</span></label>
          <textarea onChange={handleChange} required className="w-full p-2 mb-3  text-black  border border-gray-300 rounded h-24" name="about" placeholder="Hi Everyone, I am Soumyajit Behera from Bhubaneswar, India.
I am currently employed as a software developer at Juspay.
I have completed Integrated MSc (IMSc) in Maths and Computing at BIT Mesra.
"></textarea>

          {/* Hobbies Section */}
          <label className="block text-black font-medium mb-1">Hobbies:</label>
          {formData.hobbies.map((hobby, index) => (
            <input key={index} className="w-full p-2  text-black  mb-2 border border-gray-300 rounded" placeholder={`playing chess`} value={hobby} onChange={(e) => handleArrayChange( index,e, "hobbies")} />
          ))}
          <button className="bg-black text-white px-4 py-1 rounded mb-3" onClick={() => addField("hobbies")}>+ Add Hobby</button>
          {/* <div>
                <label className="block font-semibold">Hobbies:</label>
                {formData.hobbies.map((hobby, index) => (
                  <input key={index} className="w-full p-2 mb-2 border rounded" placeholder="Hobby" value={hobby} onChange={(e) => handleArrayChange(index, e, "hobbies")} />
                ))}
                <button className="bg-black text-white px-4 py-1 rounded mb-3" onClick={() => addField("hobbies")}>+ Add Hobby</button>
              </div>
            </div> */}
          {/* User Roles Section */}
          <label className="block text-black font-medium mb-1">User Roles:</label>
          {formData.roles.map((role, index) => (
            <input key={index} className="w-full text-black  p-2 mb-2 border border-gray-300 rounded" value={role} placeholder={`i.e frontendEngineer`} onChange={(e) => handleArrayChange( index,e, "roles")} />
          ))}
          <button className="bg-black text-white px-4 py-1 rounded" onClick={() => addField("roles")}>+ Add Role</button>
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

      {formData.projects.map((project, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 border border-gray-300 rounded">
          {/* Left Column */}
          <div>
            <label className="block text-black font-semibold mb-1">Project Name:<span className="text-red-600">*</span></label>
            <input
              className="w-full p-2 mb-3 border text-black border-gray-300 rounded"
              name="name"
              required
              placeholder="Enter project name"
              value={project.name}
              onChange={(e) => handleChangeProject(index, e)}
            />

            <label className="block text-black font-medium mb-1">Project Image</label>
            <input
              type="file"
              className="w-full text-black p-2 mb-3 border border-gray-300 rounded"
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
              required
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
            {
              loading ? (
                <button className="bg-blue-700 text-white px-6 py-2 rounded cursor-not-allowed" disabled>
                  Submitting...
                </button>):(
 <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition" onClick={handleSubmit}>
 Submit
</button>
                )
            }
          </div>
    </div>
  </div>
    )}
    {userId && (
      <div className="flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-4xl p-6 bg-<white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-black mb-6">Congratulations your link is ready</h2>
          <a target="_blank" href={`https://portfoliotemp1.vercel.app/${userId}`} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Visit Now</a>
          <h2 className="text-2xl font-bold text-black mb-6">To edit you portfolio click on link below</h2>
          <a target="_blank" href={`https://editportfolio.vercel.app/${userId}`} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Edit Now</a>
     </div>
  </div>
  )
};
  </div>
  );
};

export default MultiStepForm;

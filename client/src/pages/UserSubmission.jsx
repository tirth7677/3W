import React, { useState, useRef } from "react";

const UserSubmission = () => {
  const [name, setName] = useState("");
  const [socialMediaHandles, setSocialMediaHandles] = useState([{ platform: "", handle: "" }]);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State for tracking submission
  const fileInputRef = useRef(null);

  const handleAddSocialMedia = () => {
    setSocialMediaHandles([...socialMediaHandles, { platform: "", handle: "" }]);
  };

  const handleSocialMediaChange = (index, field, value) => {
    const updatedHandles = [...socialMediaHandles];
    updatedHandles[index][field] = value;
    setSocialMediaHandles(updatedHandles);
  };

  const handleRemoveSocialMedia = (index) => {
    const updatedHandles = [...socialMediaHandles];
    updatedHandles.splice(index, 1);
    setSocialMediaHandles(updatedHandles);
  };

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show loader on button

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    try {
      const socialMediaHandlesObject = socialMediaHandles.reduce((acc, item) => {
        if (item.platform && item.handle) {
          acc[item.platform] = item.handle;
        }
        return acc;
      }, {});

      const formData = new FormData();
      formData.append("name", name);
      formData.append("socialMediaHandles", JSON.stringify(socialMediaHandlesObject));
      images.forEach((image) => formData.append("images", image));

      const response = await fetch(`${baseURL}/submissions/submit`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Submission successful!");
        setName("");
        setSocialMediaHandles([{ platform: "", handle: "" }]);
        setImages([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setMessage(data.message || "Submission failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false); // Hide loader on button after submission
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          User Submission Form
        </h1>
        {message && (
          <div className={`text-center mb-4 ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Social Media Handles */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Social Media Handles</label>
            {socialMediaHandles.map((item, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <select
                  className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={item.platform}
                  onChange={(e) => handleSocialMediaChange(index, "platform", e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Platform
                  </option>
                  <option value="Instagram">Instagram</option>
                  <option value="X">X (Twitter)</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                </select>
                <input
                  type="text"
                  className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter handle (e.g., @username)"
                  value={item.handle}
                  onChange={(e) => handleSocialMediaChange(index, "handle", e.target.value)}
                  required
                />
                {socialMediaHandles.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 font-bold"
                    onClick={() => handleRemoveSocialMedia(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="text-blue-500 font-medium hover:underline"
              onClick={handleAddSocialMedia}
            >
              Add Another
            </button>
          </div>

          {/* Images */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full mb-4"
              ref={fileInputRef}
            />
            <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 text-red-500 bg-white rounded-full px-1"
                    onClick={() => handleRemoveImage(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              )}
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSubmission;

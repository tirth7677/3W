import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGoToDemo = () => {
    navigate("/main"); // Redirect to the login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          Social Media Task Explanation
        </h1>
        <div className="text-gray-700 text-lg mb-6 space-y-4">
          <h2 className="text-2xl font-semibold">Objective:</h2>
          <p>
            Create a system that allows users to submit their name, social media handle, and upload multiple images. The submitted data will be displayed on an admin dashboard, showing each user's name, social media handle, and all images they have uploaded.
          </p>
          <h2 className="text-2xl font-semibold">Features Overview:</h2>
          <ul className="list-disc ml-8 space-y-2">
            <li>
              <strong>User Form:</strong> Users will input their name, social media handle, and upload multiple images.
            </li>
            <li>
              <strong>Data Storage:</strong> All information (name, social media handle, and images) will be stored in a database.
            </li>
            <li>
              <strong>Admin Dashboard:</strong> The dashboard will display a list of all users, showing their name, social media handle, and the images they submitted.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold">Frontend (ReactJS):</h2>
          <h3 className="text-xl font-medium">User Submission Form:</h3>
          <ul className="list-disc ml-8 space-y-2">
            <li>Create a form where users can:</li>
            <ul className="list-disc ml-6 space-y-2">
              <li>Input their name.</li>
              <li>Input their social media handle.</li>
              <li>Select multiple images for upload (using a file input that allows multiple selections).</li>
            </ul>
            <li>
              The form will submit the data to the database when the user clicks a "Submit" button.
            </li>
          </ul>
          <h3 className="text-xl font-medium">Admin Dashboard:</h3>
          <ul className="list-disc ml-8 space-y-2">
            <li>
              Create a dashboard UI that fetches and displays the list of user submissions from the database.
            </li>
            <li>For each user, display:</li>
            <ul className="list-disc ml-6 space-y-2">
              <li>Name</li>
              <li>Social media handle</li>
              <li>
                Uploaded images (render the images as thumbnails or clickable links).
              </li>
            </ul>
            <li>
              Ensure that the dashboard updates dynamically when new submissions are made.
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleGoToDemo}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            Go to Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

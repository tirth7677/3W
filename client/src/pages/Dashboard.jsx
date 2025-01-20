import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      window.location.href = "/main";
      return;
    }

    if (Date.now() > storedUser.tokenExpiry) {
      localStorage.removeItem("user");
      window.location.href = "/main";
      return;
    }

    setUser(storedUser);
    fetchSubmissions(storedUser.token);
  }, []);

  const fetchSubmissions = async (token) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

    try {
      const response = await fetch(`${baseURL}/dashboard/submissions`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSubmissions(data.data);
        setError(null);
      } else {
        setError(data.message || "Failed to fetch submissions.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/main";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-7xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-8 text-center">
          Admin Dashboard
        </h1>
        {user && (
          <div className="mb-8 text-lg text-gray-700">
            <p>
              <strong>Welcome,</strong> <span className="font-semibold">{user.name}</span>
            </p>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-500"
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
            <p className="ml-4 text-blue-500 font-semibold">Loading submissions...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : submissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 rounded-md">
              <thead>
                <tr className="bg-blue-50 text-gray-700 font-semibold">
                  <th className="border border-gray-300 px-6 py-3">Name</th>
                  <th className="border border-gray-300 px-6 py-3">Social Media Handles</th>
                  <th className="border border-gray-300 px-6 py-3">Images</th>
                  <th className="border border-gray-300 px-6 py-3">Created At</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => (
                  <tr
                    key={submission._id}
                    className={`hover:bg-blue-50 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="border border-gray-300 px-6 py-4 text-gray-700">
                      {submission.name}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-gray-700">
                      {Object.entries(submission.socialMediaHandles).map(
                        ([platform, handle]) => (
                          <p key={platform} className="mb-1">
                            <strong className="capitalize">{platform}:</strong>{" "}
                            <a
                              href={handle}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              {handle}
                            </a>
                          </p>
                        )
                      )}
                    </td>
                    <td className="border border-gray-300 px-6 py-4">
                      <div className="flex gap-2 flex-wrap">
                        {submission.images.map((image, index) => (
                          <img
                            key={index}
                            src={`data:image/png;base64,${image}`}
                            alt={`submission-${index}`}
                            className="w-16 h-16 object-cover rounded-md border border-gray-200 shadow-sm"
                          />
                        ))}
                      </div>
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-gray-700">
                      {new Date(submission.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600">No submissions found.</p>
        )}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

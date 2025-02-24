"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react"; // Loading icon for a smoother effect

const UserAccess = () => {
  const [username, setUsername] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleViewCertificate = async () => {
    if (!username || !certificateId) {
      setError("Please enter both Username and Certificate ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setCertificate(null);

    try {
      const response = await fetch(`http://localhost:5000/api/certificates/${certificateId}`);
      const data = await response.json();

      if (data.success) {
        setCertificate(data.certificate);
      } else {
        setError("Certificate not found. Please check your details.");
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
      setError("Failed to fetch certificate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#27103a] via-[#300115] to-[#2e0314] text-white">
      <div className="w-full max-w-2xl p-8 bg-[#ffffff0f] backdrop-blur-lg border border-[#ffffff33] rounded-2xl shadow-2xl animate-fadeInUp">
        
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center mb-6 text-[#EAEAEA] drop-shadow-md">
          Access Your Certificate
        </h1>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 bg-[#ffffff1a] border border-[#ffffff33] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b5de5] transition-shadow"
          />
          <input
            type="text"
            placeholder="Enter Certificate ID"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="w-full p-4 bg-[#ffffff1a] border border-[#ffffff33] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f15bb5] transition-shadow"
          />
        </div>

        {/* View Certificate Button */}
        <button
          onClick={handleViewCertificate}
          className="w-full mt-4 bg-green-900 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-md flex items-center justify-center"
        >
          {loading ? <Loader2 className="animate-spin w-6 h-6" /> : "View Certificate"}
        </button>

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-400 mt-4 bg-red-900/50 p-2 rounded-md border border-red-400">
            {error}
          </p>
        )}

        {/* Certificate Preview & Download Links */}
        {certificate && (
          <div className="mt-6 text-center">
            {/* Certificate Image Preview */}
            {certificate.fileUrls?.png && (
              <div className="mb-4">
                <img
                  src={`http://localhost:5000${certificate.fileUrls.png}`}
                  alt="Certificate Preview"
                  className="w-full rounded-md border border-gray-600 shadow-lg"
                />
              </div>
            )}

            {/* Download Buttons */}
            <div className="flex justify-center space-x-4">
              {certificate.fileUrls?.pdf && (
                <a
                  href={`http://localhost:5000${certificate.fileUrls.pdf}`}
                  download
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition-all shadow-md"
                >
                  Download PDF
                </a>
              )}
              {certificate.fileUrls?.png && (
                <a
                  href={`http://localhost:5000${certificate.fileUrls.png}`}
                  download
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition-all shadow-md"
                >
                  Download PNG
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UserAccess;

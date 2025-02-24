"use client";

import { useState, useEffect } from "react";

const AdminCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/certificates/all");
        const data = await response.json();
        if (data.success) {
          setCertificates(data.certificates);
        } else {
          console.error("Error fetching certificates:", data.message);
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3a1247] text-white">
      <div className="w-full max-w-4xl p-8 bg-[#241246] rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-400">View Certificates</h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading certificates...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-black rounded-lg overflow-hidden">
  <thead>
    <tr className="bg-gray-700 text-gray-300 border border-black">
      <th className="p-3 border border-black">Name</th>
      <th className="p-3 border border-black">Course</th>
      <th className="p-3 border border-black">Unique Key</th>
      <th className="p-3 border border-black">Download</th>
    </tr>
  </thead>
  <tbody>
    {certificates.map((cert, index) => (
      <tr
        key={index}
        className="text-1xl border border-black hover:bg-pink-800 transition duration-200 ease-in-out"
      >
        <td className="p-3 border border-black">{cert.username}</td>
        <td className="p-3 border border-black">{cert.course}</td>
        <td className="p-3 border border-black">{cert.certificateId}</td>
        <td className="p-3 border border-black">
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={cert.fileUrls?.pdf ? `http://localhost:5000${cert.fileUrls.pdf}` : "#"}
              download
              className="bg-blue-500 hover:bg-blue-600 border-2 border-black p-2 rounded-lg text-white text-sm text-center"
            >
              Download PDF
            </a>
            <a
              href={cert.fileUrls?.png ? `http://localhost:5000${cert.fileUrls.png}` : "#"}
              download
              className="bg-blue-500 hover:bg-blue-600 border-2 border-black p-2 rounded-lg text-white text-sm text-center"
            >
              Download PNG
            </a>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCertificates;

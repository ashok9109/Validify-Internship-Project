// import React, { useState } from "react";

// const MyVerificationPage = () => {
//   const [verifyId, setVerifyId] = useState("");
//   const [verifyResult, setVerifyResult] = useState(null);
//   const [uploadId, setUploadId] = useState("");
//   const [uploadFile, setUploadFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState(null);
//   const [loadingVerify, setLoadingVerify] = useState(false);
//   const [loadingUpload, setLoadingUpload] = useState(false);

//   // HANDLE VERIFY: calls backend endpoint /api/certificates/verify (POST or GET)
//   const handleVerify = async (e) => {
//     e.preventDefault();
//     if (!verifyId.trim()) return;
//     setLoadingVerify(true);
//     setVerifyResult(null);

//     try {
//       // Example: POST /api/certificates/verify { certificateId }
//       const res = await fetch("/api/certificates/verify", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ certificateId: verifyId.trim() }),
//       });
//       const data = await res.json();
//       setVerifyResult(data);
//     } catch (err) {
//       console.error(err);
//       setVerifyResult({ success: false, message: "Network error" });
//     } finally {
//       setLoadingVerify(false);
//     }
//   };

//   // HANDLE UPLOAD: admin sends certificateId + file to backend
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!uploadId.trim() || !uploadFile) {
//       setUploadStatus({ success: false, message: "Provide ID and file" });
//       return;
//     }

//     setLoadingUpload(true);
//     setUploadStatus(null);

//     try {
//       const formData = new FormData();
//       formData.append("certificateId", uploadId.trim());
//       formData.append("file", uploadFile);

//       // Example: POST /api/admin/upload-certificate
//       // Backend should upload to ImageKit/Storage and save record {certificateId, fileUrl}
//       const res = await fetch("/api/admin/upload-certificate", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       setUploadStatus(data);
//     } catch (err) {
//       console.error(err);
//       setUploadStatus({ success: false, message: "Upload failed" });
//     } finally {
//       setLoadingUpload(false);
//     }
//   };

//   return (

//     <>
//     <main className="min-h-screen bg-gray-50">
//       {/* Hero */}
//       <section className="bg-gradient-to-r from-white to-teal-50">
//         <div className="max-w-6xl mx-auto px-6 py-14 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
//           <div>
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
//               Validify — Verify Internship Certificates Instantly
//             </h1>
//             <p className="mt-4 text-gray-600 text-lg">
//               Validate certificates issued by colleges and companies. Enter a certificate ID to verify authenticity, or upload certificates to make them verifiable.
//             </p>

//             <div className="mt-8 flex flex-col sm:flex-row gap-3">
//               <form onSubmit={handleVerify} className="flex gap-2 w-full sm:w-auto">
//                 <input
//                   value={verifyId}
//                   onChange={(e) => setVerifyId(e.target.value)}
//                   placeholder="Enter certificate ID (e.g. VALID-2025-12345)"
//                   className="px-4 py-3 rounded-lg border w-full sm:w-96 focus:outline-none"
//                 />
//                 <button
//                   type="submit"
//                   disabled={loadingVerify}
//                   className="bg-[#0A3D4C] text-white px-5 py-3 rounded-lg font-semibold hover:opacity-95"
//                 >
//                   {loadingVerify ? "Verifying..." : "Verify"}
//                 </button>
//               </form>
//             </div>

//             {/* verify result */}
//             {verifyResult && (
//               <div className="mt-6 p-4 rounded-md border bg-white shadow-sm">
//                 {verifyResult.success ? (
//                   <div>
//                     <h3 className="font-semibold text-green-600">Certificate Verified ✔</h3>
//                     <p className="mt-2 text-gray-700">
//                       Name: <span className="font-medium">{verifyResult.data.name}</span>
//                     </p>
//                     <p className="text-gray-700">Internship: {verifyResult.data.internshipTitle}</p>
//                     <p className="text-gray-700">Issued: {verifyResult.data.issuedDate}</p>
//                     {verifyResult.data.fileUrl && (
//                       <a
//                         className="mt-2 inline-block text-sm text-blue-600 underline"
//                         href={verifyResult.data.fileUrl}
//                         target="_blank"
//                         rel="noreferrer"
//                       >
//                         View Certificate Document
//                       </a>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="text-red-600">{verifyResult.message || "Certificate not found"}</div>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="bg-white border rounded-xl p-6 shadow-sm">
//             <h3 className="text-xl font-semibold text-gray-900">Key features</h3>
//             <ol className="mt-4 space-y-3 text-gray-700">
//               <li>
//               Verify internship certificates instantly using a <em>unique certificate </em> ID or uploaded PDF.
//               </li>
//               <li>
//               Secure, web-based platform built to help companies and colleges detect fake or altered certificates.
//               </li>
//               <li>
//                 <strong>Verify:</strong> Anyone enters the <em>certificateId</em> on this page — the server returns certificate details and the document URL.
//               </li>
//             </ol>

//             <div className="mt-6 text-sm text-gray-600">
//               Note: Builds trust between institutes, students, and recruiters
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Admin Upload + Bulk Upload UI (left/right) */}
//       <section className="max-w-6xl mx-auto px-6 py-12">
//         <div className="grid md:grid-cols-2 gap-8">
//           {/* LEFT: Bulk Student Data Upload (CSV/Excel) */}
//           <div className="bg-white border rounded-xl p-6 shadow-sm">
//             <h3 className="text-lg font-semibold">Bulk Student Data Upload</h3>
//             <p className="mt-2 text-gray-600">Upload a CSV/Excel containing student records. Each row must include a unique <strong>certificateId</strong>.</p>

//             <div className="mt-4">
//               {/* Replace this with actual handler */}
//               <label className="block mb-2 text-sm font-medium text-gray-700">Choose Excel/CSV</label>
//               <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="block" />
//               <p className="mt-3 text-xs text-gray-500">
//                 Expected columns: <code>certificateId, name, internshipTitle, issuedDate, email</code>
//               </p>
//             </div>

//             <div className="mt-6">
//               <button className="bg-[#0A3D4C] text-white px-4 py-2 rounded-lg">Upload Students</button>
//             </div>
//           </div>

//           {/* RIGHT: Single Certificate Upload (with certificateId) */}
//           <div className="bg-white border rounded-xl p-6 shadow-sm">
//             <h3 className="text-lg font-semibold">Upload a Certificate (PDF)</h3>
//             <p className="mt-2 text-gray-600">Enter the certificateId and upload the PDF. Backend will upload to ImageKit and store mapping.</p>

//             <form onSubmit={handleUpload} className="mt-4 space-y-3">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Certificate ID</label>
//                 <input
//                   value={uploadId}
//                   onChange={(e) => setUploadId(e.target.value)}
//                   type="text"
//                   className="mt-1 block w-full px-3 py-2 border rounded-md"
//                   placeholder="e.g. VALID-2025-12345"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Choose PDF</label>
//                 <input
//                   onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
//                   type="file"
//                   accept="application/pdf,image/*"
//                   className="mt-1 block w-full"
//                 />
//               </div>

//               <div className="flex items-center gap-3">
//                 <button
//                   type="submit"
//                   className="bg-[#0A3D4C] text-white px-4 py-2 rounded-md"
//                   disabled={loadingUpload}
//                 >
//                   {loadingUpload ? "Uploading..." : "Upload Certificate"}
//                 </button>

//                 {uploadStatus && (
//                   <div className={`text-sm ${uploadStatus.success ? "text-green-600" : "text-red-600"}`}>
//                     {uploadStatus.message || (uploadStatus.success ? "Uploaded" : "Failed")}
//                   </div>
//                 )}
//               </div>
//             </form>

//             <p className="mt-4 text-xs text-gray-500">
//               Backend will return a record that maps certificateId → fileUrl. This URL is used for verification and to display the certificate.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="max-w-6xl mx-auto px-6 py-10">
//         <div className="grid md:grid-cols-3 gap-6">
//           <div className="bg-white p-5 rounded-lg border shadow-sm">
//             <h4 className="font-semibold">Trusted Storage</h4>
//             <p className="mt-2 text-sm text-gray-600">Files are stored in ImageKit and data stored in the MongoDB.</p>
//           </div>

//           <div className="bg-white p-5 rounded-lg border shadow-sm">
//             <h4 className="font-semibold">Unique IDs</h4>
//             <p className="mt-2 text-sm text-gray-600">Each certificate uses a unique certificateId.</p>
//           </div>

//           <div className="bg-white p-5 rounded-lg border shadow-sm">
//             <h4 className="font-semibold">Public Verification</h4>
//             <p className="mt-2 text-sm text-gray-600">Anyone with the certificateId can verify the record and view the certificate document.</p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="mt-12 bg-white border-t">
//         <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-600">
//           © {new Date().getFullYear()} Validify — Certificate Verification System. Built by Ashok Yadav.
//         </div>
//       </footer>
//     </main>
    
//     </>
//   );
// };

// export default MyVerificationPage;


import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMyCertificatesApi } from "../apis/userCertificateApis";
import { ExternalLink, Copy } from "lucide-react";

const MyVerificationPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await getMyCertificatesApi();

      if (res.success) {
        setCertificates(res.certificates);
      } else {
        toast.error("Failed to fetch certificates");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        Loading certificates...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">
        My Certificates
      </h2>

      {certificates.length === 0 ? (
        <p>No certificates found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded">
            <thead>
              <tr className="bg-gray-100 ">
                <th className="border p-3">#</th>
                <th className="border p-3">Certificate ID</th>
                <th className="border p-3">Created Date</th>
                <th className="border p-3">Certificate</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert, index) => (
                <tr key={cert._id} className="text-center text-white">
                  <td className="border p-3">
                    {index + 1}
                  </td>

                  <td className="border p-3 font-mono flex items-center justify-center gap-2 text-white">
                    {cert.certificateId}
                    <Copy
                      size={16}
                      className="cursor-pointer text-gray-500 hover:text-black"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          cert.certificateId
                        );
                        toast.success("Certificate ID copied");
                      }}
                    />
                  </td>

                  <td className="border p-3">
                    {new Date(cert.createdAt).toLocaleDateString()}
                  </td>

                  <td className="border p-3">
                    {cert.certificateUrl ? (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                      >
                        View
                        <ExternalLink size={16} />
                      </a>
                    ) : (
                      <span className="text-gray-400">
                        Not Available
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyVerificationPage;

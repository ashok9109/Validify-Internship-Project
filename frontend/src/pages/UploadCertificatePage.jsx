import { useState } from "react";
import { uploadUserCertificateApi } from "../apis/userCertificateApis";
import { toast } from "react-toastify";

const UploadCertificatePage = () => {

  const [certificateId, setCertificateId] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [isUploadingCert, setIsUploadingCert] = useState(false);

  const handleCertificateSubmit = async (e) => {
    e.preventDefault();
    if (!certificateId.trim()) {
      alert("Please enter certificate ID.");
      return;
    }
    if (!certificateFile) {
      alert("Please select a certificate file.");
      return;
    }

    try {
      setIsUploadingCert(true);

      const formData = new FormData();
      formData.append("certificateId", certificateId);
      formData.append("file", certificateFile);
      const response = await uploadUserCertificateApi(formData);
      if (response) {
        toast.success("Your certificate is Uploaded", { theme: "dark" })
      }

      setCertificateId("");
      setCertificateFile(null);
    } catch (err) {
      console.error(err);
      alert("Error uploading certificate");
    } finally {
      setIsUploadingCert(false);
    }
  };

  return (
    <section className="min-h-screen  bg-slate-950 flex flex-col items-center justify-center px-4 py-10 ">
      <div className="max-w-6xl w-full flex flex-col items-center justify-center">
        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Upload Your Own certificates
          </h1>
          <p className="text-slate-300 mt-2 text-sm md:text-base">
            Your can save your own certificate with <span className="font-semibold text-emerald-400">certificateId</span>.
          </p>
        </div>

        {/* Certificate Upload */}
        <div className="max-w-2xl bg-slate-900/70 border border-emerald-500 rounded-2xl shadow-xl p-6 md:p-7 backdrop-blur">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
            2. Upload Certificate File
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Upload the certificate PDF/image and link it using the same{" "}
            <span className="font-semibold text-emerald-400">certificateId</span>{" "}
            This will be stored in MongoDB
          </p>

          <form onSubmit={handleCertificateSubmit} className="space-y-4">
            {/* Certificate ID */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Certificate ID
              </label>
              <input
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="e.g. CERT-001-2025 "
                className="w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-900/80 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Must match the <b>certificateId</b> in the Excel row.
              </p>
            </div>

            {/* File input */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Certificate File (PDF / Image)
              </label>
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-emerald-400 transition">
                <span className="text-slate-300 text-sm">
                  {certificateFile ? (
                    <span className="font-medium text-emerald-400">
                      {certificateFile.name}
                    </span>
                  ) : (
                    <>
                      Click to browse or drag & drop
                      <span className="block text-xs text-slate-500">
                        (PDF, PNG, JPG)
                      </span>
                    </>
                  )}
                </span>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  className="hidden"
                  onChange={(e) =>
                    setCertificateFile(e.target.files[0] || null)
                  }
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={isUploadingCert}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isUploadingCert ? "Uploading..." : "Upload Certificate"}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className=" border-t border-emerald-500 px-3 py-4 mt-4">
        <div className="max-w-6xl mx-auto  text-sm text-gray-600">
          © {new Date().getFullYear()} Validify — Certificate Verification System. Built by <span className='text-emerald-500' >Ashok Yadav</span>.
        </div>
      </footer>
    </section>
  );
};

export default UploadCertificatePage;

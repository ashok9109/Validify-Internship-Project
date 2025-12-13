import React, { useState } from 'react'
import { UploadExcelApi } from '../apis/adminApis';
import { toast } from 'react-toastify';


const UploadDataPage = () => {

  const [excelFile, setExcelFile] = useState(null);
  const [isUploadinExcel, setIsUploadinExcel] = useState(false);
  const [certificateFile, setCertificateFile] = useState(null);
  const [isUploadinCertificate, setIsUploadinCertificate] = useState(false);
  const [certificateId, setCertificateId] = useState("");

  const handleExcelSubmit = async (e) => {
    e.preventDefault();

    if (!excelFile) {
      alert("Please select the excel file");
      return
    }
    try {
      setIsUploadinExcel(true);

      const formData = new FormData();
      formData.append("file", excelFile);
      const response = await UploadExcelApi(formData);
      if (response) {
        toast.success("Excel Data Uploaded successfully");
      }

    } catch (error) {
      console.log(error)
      alert("error in uploading excel file")
    } finally {
      setIsUploadinExcel(false);
    };
  };

  const handleCertificateSubmit = async (e) => {
    e.preventDefault();

    if (!certificateId.trim()) {
      alert("Please enter the your certficate id ")
      return
    }

    if (!certificateFile) {
      alert("Please upload the certificate")
      return
    }

    try {
      setIsUploadinCertificate(true);

      const formData = new FormData();
      formData.append("file", certificateFile);
      formData.append("certificateId", certificateId);

    } catch (error) {
      console.log(error);
      alert("error uploading in certificate and certificate ID")
    } finally {
      setIsUploadinCertificate(false);
    };
  };

  return (
    <>
      <section className='min-h-screen bg-slate-950 flex flex-col items-center justify-center'>
        <div className='max-w-6xl w-full' >

          {/* Headings */}
          <div className='text-center mb-8' >
            <h1 className='text-3xl font-extrabold text-white tracking-tight md:text-4xl' >
              Certificate Data Management
            </h1>
            <p className='text-slate-300 text-sm  md:text-base ' >
              Upload the student records via Excel and link certificate using <span className='text-emerald-400 font-semibold'>CertificateId</span>
            </p>
          </div>

          {/* Two column layout */}
          <div className='grid gap-6 md:grid-cols-2'>

            {/* Left div Excel upload  */}
            <div className='bg-slate-900/50 border border-emerald-500 rounded-3xl shadow-lg p-6 md:p-7 backdrop-blur space-y-7' >
              <h1 className='text-white text-xl md:text-2xl font-semibold mb-7 ' >
                1. Upload Student Data (Excel)
              </h1>
              <p className='text-slate-300 text-sm mb-4' >
                Upload a sheet containing student details, including {" "}
                <span className='text-emerald-400 font-semibold' >CertificateID</span>.
                This will be stored in MongoDB
              </p>

              <ul className='list-disc list-inside  text-slate-400' >
                <li>Allowed Format <b>.xlsx</b>, <b>.xls</b>, <b>.csv</b></li>
                <li>Make sure each row has a unique <b>certificateID</b></li>
              </ul>

              {/* form upload excel */}
              <form onSubmit={handleExcelSubmit} className='space-y-4'>
                <label className='block text-slate-200 font-medium text-sm'>
                  Excel File
                </label>
                <label className='flex flex-col items-center justify-center h-28 w-full border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-emerald-400' >
                  <span className='text-slate-300' >
                    {excelFile ? (
                      <span className='text-emerald-400' >{excelFile.name}</span>
                    ) : (
                      <>
                        Click to browse or drag & drop
                        <span className='text-slate-500' >
                          (Excel / CSV)
                        </span>
                      </>
                    )}
                  </span>
                  <input
                    type="file"
                    accept='.xlsx,.xls,.csv'
                    className='hidden'
                    onChange={(e) => setExcelFile(e.target.files[0] || null)}
                  />
                </label>

                <button
                  type='submit'
                  disabled={isUploadinExcel}
                  className='w-full inline-flex items-center justify-center bg-emerald-500 px-4 py-2.5 rounded-lg hover:emerald-300 font-semibold txet-sm text-slate-950 shadow-lg shadow-emerald-500/30'
                >
                  {isUploadinExcel ? "....Uploadind" : "Upload Excel"}
                </button>
              </form>
            </div>

            {/* Right: upload the certificate  */}
            <div className='bg-slate-900/50 border border-emerald-500 rounded-3xl shadow-lg p-6 md:p-7 backdrop-blur ' >
              <h1 className='text-white text-xl md:text-2xl font-semibold mb-2 ' >
                2. Upload Certificate File
              </h1>
              <p className='text-slate-300 text-sm mb-4' >
                Upload the certificate Pdf/image and link using the same {" "}
                <span className='text-emerald-400 font-semibold' >CertificateID</span>.
                that exists in the excel data
              </p>


              {/* form upload certificate */}
              <form onSubmit={handleCertificateSubmit} className='space-y-4'>
                <div>
                  <label className='block text-sm text-slate-200 text-medium mb-2' >
                    Certificate Id
                  </label>
                  <input
                    type="text"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    placeholder="e.g. CERT-001-2025"
                    className='w-full px-2 py-3 rounded-lg border border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Must match the <b>certificateId</b> in the Excel row.
                  </p>
                </div>


                {/* file upload */}
                <div>
                  <label className='block text-slate-200 font-medium text-sm mb-2'>
                    Certificate File (PDF / Image)
                  </label>
                  <label className='flex flex-col items-center justify-center h-28 w-full border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-emerald-400' >
                    <span className='text-slate-300' >
                      {certificateFile ? (
                        <span className='text-emerald-400' >{certificateFile.name}</span>
                      ) : (
                        <>
                          Click to browse or drag & drop
                          <span className='text-slate-500' >
                            (PDF, PNG, JPG)
                          </span>
                        </>
                      )}
                    </span>
                    <input
                      type="file"
                      accept='.pdf, image/'
                      className='hidden'
                      onChange={(e) => setCertificateFile(e.target.files[0] || null)}
                    />
                  </label>
                </div>

                <button
                  type='submit'
                  disabled={isUploadinCertificate}
                  className='w-full inline-flex items-center justify-center bg-emerald-500 px-4 py-2.5 rounded-lg hover:emerald-300 font-semibold txet-sm text-slate-950 shadow-lg shadow-emerald-500/30'
                >
                  {isUploadinCertificate ? "....Uploadind" : "Upload Certificate"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className=" border-t border-emerald-500 px-3 py-4 mt-4">
          <div className="max-w-6xl mx-auto  text-sm text-gray-600">
            © {new Date().getFullYear()} Validify — Certificate Verification System. Built by <span className='text-emerald-500' >Ashok Yadav</span>.
          </div>
        </footer>
      </section>
    </>
  )
}

export default UploadDataPage;

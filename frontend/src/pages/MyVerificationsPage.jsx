import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { verificationApi } from '../apis/adminApis';
import logo from '../images/verified-logo.png'

const MyVerificationsPage = () => {

  const [certificateId, setCertificateId] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleVerify = async () => {

    if (!certificateId.trim()) {
      toast.error("Certificate ID is required", { theme: 'dark' })
      return
    }

    try {
      setLoading(true);
      setStudent(null);

      const response = await verificationApi(certificateId);
      if (response.success) {
        setStudent(response.student);
        toast.success(" Certificate Verified ✅ ", { theme: "dark" })
      }
    } catch (error) {
      setStudent(null);
      toast.error(error.response?.data || "Invalid Certificate ID", { theme: "dark" });
    } finally {
      setLoading(false);
    };
  };

  return (
    <>
      <section className='min-h-screen bg-slate-950 p-6' >
        <div className='max-w-6xl flex flex-col items-center justify-center p-0  md:p-7' >
          <h1 className=' flex text-sm md:text-3xl text-emerald-500  font-bold hover:underline hover:scale-[0.9] transition pb-5 ' >
            {/* <img className='h-10 hidden md:block' src={logo} alt="" /> */}
            CERTIFICATES - VERIFICATION
          </h1>

          {/* Input + button */}
          <div className='flex flex-col items-center justify-center md:flex-row ' >
            <input
              type="text"
              placeholder='____Enter Certificate ID____'
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              className='px-2 py-1 m-4 md:px-20 md:py-4 md:m-5 rounded text-sm md:text-xl bg-gray-300 border-4 border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500'
            />

            <button
              onClick={handleVerify}
              disabled={loading}
              className='text-black bg-emerald-500 px-3 py-2 text-sm md:px-6 md:py-2 rounded shadow-lg shadow-emerald-500/30'
            >
              {loading ? "Verifying....." : "Verify Now"}
            </button>
          </div>

          {/* Verified Section */}
          {student && (
            <>
              <div className='max-w-3xl w-full flex items-center justify-center bg-green-100 text-green-800 rounded text-sm p-1 m-4 md:text-lg md:mb-4 md:p-4' >
                <img className='h-10 ' src={logo} alt="" />
                Certificate is Verified
              </div>

              {/* certificate preview */}
              {student.certificateUrl && (
                <div className=' text-center ' >
                  <h2 className='md:text-3xl p-3 text-emerald-500' >
                    CERTIFICATE PREVIEW
                  </h2>

                  <div className=' md:p-5 border-5 border-emerald-500 p-5' >
                    <img
                      src={student.certificateUrl}
                      alt="Certificate Image"
                      className='w-full max-h-[500px] object-contain  '
                    />
                  </div>
                </div>
              )}

              {/* student details */}
              <div className='max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 gap-4 p-4' >
                <Detail label="Full Name" value={student.fullName} />
                <Detail label="Email" value={student.email} />
                <Detail label="Course" value={student.course} />
                <Detail label="Duration" value={student.duration} />
                <Detail label="Certificate ID" value={student.certificateId} />
                <Detail label="Issue Date" value={new Date(student.createdAt).toLocaleDateString()} />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

const Detail = ({ label, value }) => (
  <div className='border-2 border-emerald-500 rounded p-1' >
    <p className='text-sm text-gray-300 ' >{label}</p>
    <p className='font-semibold text-white' >{value}</p>
  </div>
)

export default MyVerificationsPage;
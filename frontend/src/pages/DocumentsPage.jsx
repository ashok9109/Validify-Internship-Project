import { useEffect, useState } from "react";
import { getMyCertificatesApi } from "../apis/userCertificateApis";
import { toast } from "react-toastify";
import { Copy, ExternalLink } from "lucide-react";


const DocumentsPage = () => {

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCertificates = async () => {
    try {
      setLoading(true);

      const response = await getMyCertificatesApi();
      if (response.success) {
        setCertificates(response.certificates);
      } else {
        toast.error("failed to fetch the certificates");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCertificates()
  }, []);

  if (loading) {
    return (
      <div className="text-2xl text-white text-center mt-20" >
        Loading certificates......
      </div>
    )
  }

  return (
    <section className="max-w-5xl mx-auto p-6 text-center text-white">
      <h1 className="text-2xl font-bold p-6 text-emerald-500  " >My Certificates</h1>

      {certificates.length === 0 ? (
        <div className="text-center text-2xl" >
          <h1 className="text-gray-500" >-------No Certificates Found-------- </h1>
        </div>
      ) : (
        <div>
          <table className="w-full border rounded" >
            <thead>
              <tr className="bg-gray-200 text-black" >
                <th className="border p-3 " >#</th>
                <th className="border p-3 " >CetificateId</th>
                <th className="border p-3 " >Created Date</th>
                <th className="border p-3 " >Certificates</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert, index) => (
                <tr key={cert._id} className="text-center" >
                  <td className="border p-3" >
                    {index + 1}
                  </td>
                  <td className="flex gap-2 items-center justify-center border p-3" >
                    {cert.certificateId}
                    <Copy
                      size={16}
                      className="cursor-pointer hover:text-emerald-500"
                      onClick={() => {
                        navigator.clipboard.writeText(cert.certificateId);
                        toast.success("Certificate ID copied")
                      }}
                    />
                  </td>
                  <td className="border p-3" >
                    {new Date(cert.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border p-3" >
                    {cert.certificateUrl ? (
                      <a href={cert.certificateUrl}
                      target="_blank"
                      className="flex items-center justify-center text-emerald-500 hover:text-white transition"
                      >
                        View
                        <ExternalLink 
                        size={16}
                        />
                      </a>
                    ) : (
                      <span className="text-gray-400" >
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

    </section>
  )

}

export default DocumentsPage;
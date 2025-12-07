import React from 'react'

const HomePage = () => {
    return (
        <>
            <main className='min-h-screen bg-slate-950 ' >
                <section className='max-w-8xl w-full grid lg:grid-cols-2 text-center px-6 py-7 lg:py-24 gap-10' >

                    {/* left div */}
                    <div>
                        <h1 className='text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold' >
                            <span className='text-emerald-500' >Validify</span> —  Verify Internship certificate Instantly
                        </h1>
                        <p className="mt-4 text-white text-lg">
                            Validate certificates issued by colleges and companies. Enter a certificate ID to verify authenticity, or upload certificates to make them verifiable.
                        </p>
                    </div>

                    {/* right div */}
                    <div className="bg-slate-900/70 text-white border border-emerald-500 rounded-xl p-6 shadow-lg backdrop-blur">
                        <h3 className="text-xl font-semibold ">Key features</h3>
                        <ol className="mt-4 space-y-3 ">
                            <li>
                                Verify internship certificates instantly using a <em>unique certificate </em> ID or uploaded PDF.
                            </li>
                            <li>
                                Secure, web-based platform built to help companies and colleges detect fake or altered certificates.
                            </li>
                            <li>
                                Anyone enters the <em>certificateId</em> on this page — the server returns certificate details and the document URL.
                            </li>
                        </ol>

                        <div className="mt-6 text-sm ">
                            Note: Builds trust between institutes, students, and recruiters
                        </div>
                    </div>
                </section>

                {/* next section */}
                <section className="max-w-6xl mx-auto px-6 ">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className=" p-5 rounded-lg border border-emerald-500 shadow-sm">
                            <h4 className="font-semibold text-white">Trusted Storage</h4>
                            <p className="mt-2 text-sm text-gray-400">Files are stored in ImageKit and data stored in the MongoDB.</p>
                        </div>

                        <div className=" p-5 rounded-lg border border-emerald-500 shadow-sm">
                            <h4 className="font-semibold text-white">Unique IDs</h4>
                            <p className="mt-2 text-sm text-gray-400">Each certificate uses a unique certificateId.</p>
                        </div>

                        <div className=" p-5 rounded-lg border border-emerald-500 shadow-sm">
                            <h4 className="font-semibold text-white ">Public Verification</h4>
                            <p className="mt-2 text-sm text-gray-400">Anyone with the certificateId can verify the record and view the certificate document.</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className=" border-t border-emerald-500 px-3 py-4 mt-4">
                        <div className="max-w-6xl mx-auto  text-sm text-gray-600">
                            © {new Date().getFullYear()} Validify — Certificate Verification System. Built by <span className='text-emerald-500' >Ashok Yadav</span>.
                        </div>
                    </footer>
                </section>
            </main>
        </>
    )
}

export default HomePage;

import React from 'react'

const MyVerificationsPage = () => {
  return (
    <div className='h-screen w-full bg-slate-950' >
      my verifications

      {/* Footer */}
      <footer className=" border-t">
        <div className="max-w-6xl mx-auto  text-sm text-gray-600">
          © {new Date().getFullYear()} Validify — Certificate Verification System. Built by <span className='text-emerald-500' >Ashok Yadav</span>.
        </div>
      </footer>
    </div>
  )
}

export default MyVerificationsPage;

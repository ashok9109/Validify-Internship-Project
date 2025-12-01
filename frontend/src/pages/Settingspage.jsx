
// import { useState } from "react";

// export default function ValidifyLayout({ leftContent, children }) {
//   const [openMobileMenu, setOpenMobileMenu] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Mobile header */}
//       <header className="md:hidden bg-white shadow-sm px-4 py-3 flex items-center justify-between">
//         <div className="text-lg font-bold">Validify</div>
//         <button
//           className="p-2 rounded-md border"
//           onClick={() => setOpenMobileMenu(v => !v)}
//           aria-label="Toggle menu"
//         >
//           {/* simple hamburger */}
//           <span className="block w-5 h-[2px] bg-gray-700 mb-1"></span>
//           <span className="block w-5 h-[2px] bg-gray-700 mb-1"></span>
//           <span className="block w-5 h-[2px] bg-gray-700"></span>
//         </button>
//       </header>

//       <div className="max-w-7xl mx-auto">
//         <div className="md:flex md:items-start">
//           {/* LEFT PANEL */}
//           <aside
//             className={`
//               w-full md:w-80 lg:w-96 bg-white shadow-md
//               ${openMobileMenu ? "block" : "hidden"} md:block
//             `}
//           >
//             {/* Make left panel full height on md+, and scroll independently */}
//             <div className="h-[calc(100vh-64px)] md:h-screen overflow-y-auto p-6">
//               <div className="mb-6">
//                 <h1 className="text-2xl font-extrabold">Validify</h1>
//                 <p className="text-sm text-gray-500 mt-2">Verify certificates instantly</p>
//               </div>

//               {/* Example hero card */}
//               <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-4 mb-6 shadow-sm">
//                 <h2 className="font-semibold text-lg">Verify Now</h2>
//                 <p className="text-sm text-gray-600 mt-2">Paste certificate ID or upload PDF</p>
//                 <button className="mt-4 w-full bg-[#0A3D4C] text-white py-2 rounded">Start Verification</button>
//               </div>

//               {/* Some links / quick actions */}
//               <nav className="space-y-3">
//                 <a className="block px-3 py-2 rounded hover:bg-gray-50">Dashboard</a>
//                 <a className="block px-3 py-2 rounded hover:bg-gray-50">My Verifications</a>
//                 <a className="block px-3 py-2 rounded hover:bg-gray-50">Upload Certificate</a>
//                 <a className="block px-3 py-2 rounded hover:bg-gray-50">API Docs</a>
//               </nav>
//             </div>
//           </aside>

//           {/* RIGHT CONTENT */}
//           <main className="flex-1">
//             <div className="p-4 md:p-8">
//               {/* Breadcrumb / page header */}
//               <div className="mb-6 flex items-center justify-between">
//                 <h2 className="text-xl md:text-2xl font-bold">Certificate Verification</h2>
//                 <div className="hidden md:flex gap-3">
//                   <button className="px-3 py-2 border rounded">Sign In</button>
//                   <button className="px-3 py-2 bg-[#0A3D4C] text-white rounded">Get API Key</button>
//                 </div>
//               </div>

//               {/* Page body */}
//               <section className="bg-white rounded-lg shadow p-6">
//                 {children /* pass verification form or content here */}
//               </section>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react'

const Settingspage = () => {
  return (
    <div>
      <h1>this is settings</h1>
    </div>
  )
}

export default Settingspage

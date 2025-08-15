// // import AdminDashboard from "@/app/components/admin/home";
// // import AdminDashboardSkeleton from "@/app/components/admin/home/skeleton";
// import React, { Suspense } from "react";
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// const AdminDashboardPage = () => {
//   return (
//     <div>admin main page</div>
//     // <Suspense fallback={<AdminDashboardSkeleton />}>
//     //   <AdminDashboard />
//     // </Suspense>
//   );
// };

// export default AdminDashboardPage;



// app/admin/page.tsx   new code
export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";

export default function AdminDashboardPage() {
  return <div>admin main page</div>;
}


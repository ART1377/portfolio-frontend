import AdminDashboard from "@/app/components/admin/home";
import AdminDashboardSkeleton from "@/app/components/admin/home/skeleton";
import React, { Suspense } from "react";

const AdminDashboardPage = () => {
  return (
    <div>admin main page</div>
    // <Suspense fallback={<AdminDashboardSkeleton />}>
    //   <AdminDashboard />
    // </Suspense>
  );
};

export default AdminDashboardPage;

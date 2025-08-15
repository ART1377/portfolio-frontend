import AdminSubmissions from "@/app/components/admin/submission";
import SubmissionsSkeleton from "@/app/components/admin/suggestion/skeleton";
import React, { Suspense } from "react";

const AdminSubmissionsPage = () => {
  return (
    <Suspense fallback={<SubmissionsSkeleton />}>
      <AdminSubmissions />
    </Suspense>
  );
};

export default AdminSubmissionsPage;

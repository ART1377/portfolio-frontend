import AdminAboutEditor from "@/app/components/admin/about";
import AboutEditorSkeleton from "@/app/components/admin/about/skeleton";
import React, { Suspense } from "react";

const AdminAboutEditorPage = () => {
  return (
    <Suspense fallback={<AboutEditorSkeleton />}>
      <AdminAboutEditor />
    </Suspense>
  );
};

export default AdminAboutEditorPage;

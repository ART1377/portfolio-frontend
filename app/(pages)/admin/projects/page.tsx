import AdminProjectsEditor from "@/app/components/admin/projects";
import ProjectsEditorSkeleton from "@/app/components/admin/projects/skeleton";
import React, { Suspense } from "react";

const AdminProjectsEditorPage = () => {
  return (
    <>
      <Suspense fallback={<ProjectsEditorSkeleton />}>
        <AdminProjectsEditor />
      </Suspense>
    </>
  );
};

export default AdminProjectsEditorPage;

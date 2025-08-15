import AdminExperiencesEditor from "@/app/components/admin/experiences";
import ExperienceEditorSkeleton from "@/app/components/admin/experiences/skeleton";
import React, { Suspense } from "react";

const AdminExperiencesEditorPage = () => {
  return (
    <Suspense fallback={<ExperienceEditorSkeleton />}>
      <AdminExperiencesEditor />
    </Suspense>
  );
};

export default AdminExperiencesEditorPage;

import AdminSkillsEditor from "@/app/components/admin/skills";
import SkillsEditorSkeleton from "@/app/components/admin/skills/skeleton";
import React, { Suspense } from "react";


const AdminSkillsEditorPage = () => {
  return (
    <>
      <Suspense fallback={<SkillsEditorSkeleton />}>
        <AdminSkillsEditor />
      </Suspense>
    </>
  );
};

export default AdminSkillsEditorPage;

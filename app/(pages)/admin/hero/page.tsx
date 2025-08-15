import React, { Suspense } from "react";
import AdminHeroEditor from "@/app/components/admin/hero";
import HeroEditorSkeleton from "@/app/components/admin/hero/skeleton";

const AdminHeroEditorPage = () => {
  return (
    <>
      <Suspense fallback={<HeroEditorSkeleton />}>
        <AdminHeroEditor />
      </Suspense>
    </>
  );
};

export default AdminHeroEditorPage;

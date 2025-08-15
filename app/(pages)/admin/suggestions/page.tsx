import AdminSuggestions from "@/app/components/admin/suggestion";
import SuggestionsEditorSkeleton from "@/app/components/admin/suggestion/skeleton";
import React, { Suspense } from "react";

const AdminSuggestionsPage = () => {
  return (
    <Suspense fallback={<SuggestionsEditorSkeleton />}>
      <AdminSuggestions />
    </Suspense>
  );
};

export default AdminSuggestionsPage;

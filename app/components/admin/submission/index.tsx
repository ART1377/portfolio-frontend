import { fetchSubmissions } from "@/app/lib/fetch/admin/fetchSubmissions";
import React from "react";
import Submissions from "./content";

const AdminSubmissions = async () => {
  const submissions = await fetchSubmissions();
  return <Submissions submissions={submissions} />;
};

export default AdminSubmissions;

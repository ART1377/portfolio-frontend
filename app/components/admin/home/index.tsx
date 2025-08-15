// app/admin/page.tsx or app/admin/dashboard/page.tsx
import { fetchProjects } from "@/app/lib/fetch/fetchProjects";
import { fetchSkills } from "@/app/lib/fetch/fetchSkills";
import { fetchExperiences } from "@/app/lib/fetch/fetchExperiences";
import { fetchContactInfo } from "@/app/lib/fetch/admin/fetchContactInfo";
import { fetchSubmissions } from "@/app/lib/fetch/admin/fetchSubmissions";
import { fetchAboutData } from "@/app/lib/fetch/fetchAbout";
import AdminDashboardContent from "./content";



export default async function AdminDashboard() {
  const [projects, skills, experienceData, contactInfo, submissions, aboutData] =
    await Promise.all([
      fetchProjects(),
      fetchSkills(),
      fetchExperiences(),
      fetchContactInfo(),
      fetchSubmissions(),
      fetchAboutData(),
    ]);

  return (
    <AdminDashboardContent
      projects={projects}
      skills={skills}
      experienceData={experienceData}
      contactInfo={contactInfo}
      submissions={submissions}
      aboutData={aboutData}
    />
  );
}


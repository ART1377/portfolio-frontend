// "use client";

// import { Button } from "@/app/components/ui/button";
// import { AddButton } from "@/app/components/ui/button"; // our theme-aware AddButton
// import { Card, CardContent } from "@/app/components/ui/card";
// import { Input } from "@/app/components/ui/input";
// import { Textarea } from "@/app/components/ui/textarea";
// import { Label } from "@/app/components/ui/label";
// import ProjectsEditorSkeleton from "../skeleton";
// import { useProjectsEditor } from "../hooks/useProjectsEditor";
// import AdminSectionHeader from "../../admin-section-header";
// import ChipsInput from "../../../chips-input";
// import { ImageUpload } from "./image-upload";
// import { uploadImage } from "@/app/lib/utils/upload/image";
// import { useTranslation } from "react-i18next";

// export default function ProjectsEditor() {
//   const {
//     projects,
//     error,
//     isLoading,
//     handleChange,
//     handleSave,
//     addProject,
//     removeProject,
//   } = useProjectsEditor();

//   const { t } = useTranslation("dashboard");

//   if (isLoading || !projects) return <ProjectsEditorSkeleton />;
//   if (error) return <p className="text-red-600 dark:text-red-400">{t("projects.UpdateError")}</p>;

//   return (
//     <section className="section-container my-10">
//       <Card className="max-w-4xl mx-auto">
//         <AdminSectionHeader title={t("projects.Title")} />
//         <CardContent className="space-y-8">
//           {projects.map((project, idx) => {
//             const baseId = `project-${idx}`;
//             return (
//               <div key={idx} className="border p-4 rounded-md space-y-6">
//                 <div className="space-y-2">
//                   <Label htmlFor={`${baseId}-title`} className="block mb-1 font-semibold">
//                     {t("projects.PlaceholderTitle")}
//                   </Label>
//                   <Input
//                     id={`${baseId}-title`}
//                     value={project.title}
//                     onChange={(e) => handleChange(idx, "title", e.target.value)}
//                     placeholder={t("projects.PlaceholderTitle")}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor={`${baseId}-description`} className="block mb-1 font-semibold">
//                     {t("projects.PlaceholderDescription")}
//                   </Label>
//                   <Textarea
//                     id={`${baseId}-description`}
//                     value={project.description}
//                     onChange={(e) => handleChange(idx, "description", e.target.value)}
//                     placeholder={t("projects.PlaceholderDescription")}
//                   />
//                 </div>

//                 <ImageUpload
//                   project={project}
//                   idx={idx}
//                   baseId={baseId}
//                   handleChange={handleChange}
//                   uploadImage={uploadImage}
//                   handleSave={handleSave}
//                 />

//                 <div className="space-y-2">
//                   <Label htmlFor={`${baseId}-liveUrl`} className="block mb-1 font-semibold">
//                     {t("projects.PlaceholderLiveUrl")}
//                   </Label>
//                   <Input
//                     id={`${baseId}-liveUrl`}
//                     value={project.liveUrl}
//                     onChange={(e) => handleChange(idx, "liveUrl", e.target.value)}
//                     placeholder={t("projects.PlaceholderLiveUrl")}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor={`${baseId}-githubUrl`} className="block mb-1 font-semibold">
//                     {t("projects.PlaceholderGithubUrl")}
//                   </Label>
//                   <Input
//                     id={`${baseId}-githubUrl`}
//                     value={project.githubUrl}
//                     onChange={(e) => handleChange(idx, "githubUrl", e.target.value)}
//                     placeholder={t("projects.PlaceholderGithubUrl")}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor={`${baseId}-technologies`} className="block mb-1 font-semibold">
//                     {t("projects.PlaceholderTechnologies")}
//                   </Label>
//                   <ChipsInput
//                     values={project.technologies}
//                     onChange={(newValues) => handleChange(idx, "technologies", newValues)}
//                     placeholder={t("projects.PlaceholderTechnologies")}
//                   />
//                 </div>

//                 <Button
//                   variant="destructive"
//                   onClick={() => removeProject(idx)}
//                   className="mt-2"
//                 >
//                   {t("projects.RemoveProject")}
//                 </Button>
//               </div>
//             );
//           })}

//           <div className="flex gap-4 pt-6 justify-center">
//             <AddButton color="primary" onClick={addProject}>
//               {t("projects.AddProject")}
//             </AddButton>
//             <Button onClick={handleSave} isLoading={isLoading}>
//               {!isLoading && t("projects.Save")}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </section>
//   );
// }

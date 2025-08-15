"use client";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import {
  Plus,
  Trash2,
  Save,
  X,
  Code2,
  ExternalLink,
  Github,
} from "lucide-react";
import AdminSectionHeader from "../../admin-section-header";
import { useProjectsEditor } from "../hooks/useProjectsEditor";
import { ImageUpload } from "./image-upload";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AddButton } from "@/app/components/ui/button"; // primary AddButton
import { uploadImage } from "@/app/lib/utils/upload/image";
import ProjectsEditorSkeleton from "../skeleton";

export default function ProjectsEditor() {
  const {
    projects,
    handleChange,
    addProject,
    removeProject,
    handleSave,
    isLoading,
    error,
  } = useProjectsEditor();

  const { t } = useTranslation("dashboard");
  const [newTech, setNewTech] = useState<{ [key: number]: string }>({});

  const addTechnology = (idx: number) => {
    const tech = newTech[idx]?.trim();
    if (!tech || !projects) return;
    handleChange(idx, "technologies", [...projects[idx].technologies, tech]);
    setNewTech((prev) => ({ ...prev, [idx]: "" }));
  };

  const removeTechnology = (projectIdx: number, techIdx: number) => {
    if (!projects) return;
    const updated = projects[projectIdx].technologies.filter(
      (_, i) => i !== techIdx
    );
    handleChange(projectIdx, "technologies", updated);
  };

  if (!projects) return <ProjectsEditorSkeleton />;
  if (error)
    return (
      <p className="text-red-600 dark:text-red-400">
        {t("projects.UpdateError")}
      </p>
    );

  return (
    <section className="section-container my-10">
      <Card className="max-w-5xl mx-auto">
        <AdminSectionHeader title={t("projects.Title")} />
        <CardContent className="space-y-8">
          {projects.map((project, idx) => {
            const baseId = `project-${idx}`;
            return (
              <Card
                key={idx}
                className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-teal-50/50 to-cyan-50/50 dark:from-teal-950/20 dark:to-cyan-950/20"
              >
                <CardHeader className="border-b border-primary/20 dark:border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/30">
                        <Code2 className="h-5 w-5 text-primary dark:text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {t("projects.Project")} {idx + 1}
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(idx)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {/* Title */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          <Code2 className="h-4 w-4 text-primary dark:text-primary" />{" "}
                          {t("projects.Title")}
                        </Label>
                        <Input
                          id={`${baseId}-title`}
                          value={project.title}
                          onChange={(e) =>
                            handleChange(idx, "title", e.target.value)
                          }
                          placeholder={t("projects.PlaceholderTitle")}
                        />
                      </div>

                      {/* Live URL */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-primary dark:text-primary" />{" "}
                          {t("projects.LiveUrl")}
                        </Label>
                        <Input
                          id={`${baseId}-liveUrl`}
                          value={project.liveUrl}
                          onChange={(e) =>
                            handleChange(idx, "liveUrl", e.target.value)
                          }
                          placeholder="https://your-project.com"
                        />
                      </div>

                      {/* GitHub URL */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          <Github className="h-4 w-4 text-primary dark:text-primary" />{" "}
                          GitHub URL
                        </Label>
                        <Input
                          id={`${baseId}-githubUrl`}
                          value={project.githubUrl}
                          onChange={(e) =>
                            handleChange(idx, "githubUrl", e.target.value)
                          }
                          placeholder="https://github.com/user/repo"
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-4">
                      <ImageUpload
                        project={project}
                        idx={idx}
                        baseId={baseId}
                        handleChange={handleChange}
                        uploadImage={uploadImage}
                        handleSave={handleSave}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {t("projects.Description")}
                    </Label>
                    <Textarea
                      id={`${baseId}-description`}
                      value={project.description}
                      onChange={(e) =>
                        handleChange(idx, "description", e.target.value)
                      }
                      placeholder={t("projects.PlaceholderDescription")}
                      className="min-h-[100px]"
                    />
                  </div>

                  {/* Technologies */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      {t("projects.Technologies")}
                    </Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, techIdx) => (
                        <Badge key={techIdx} variant="secondary">
                          {tech}
                          <button
                            onClick={() => removeTechnology(idx, techIdx)}
                          >
                            <X className="h-3 w-3 ml-1" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newTech[idx] || ""}
                        onChange={(e) =>
                          setNewTech((prev) => ({
                            ...prev,
                            [idx]: e.target.value,
                          }))
                        }
                        placeholder="Add technology"
                        onKeyPress={(e) =>
                          e.key === "Enter" && addTechnology(idx)
                        }
                      />
                      <Button onClick={() => addTechnology(idx)} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Add / Save Buttons */}
          <div className="flex justify-center gap-4 pt-6">
            <AddButton color="primary" className="w-fit" onClick={addProject}>
              {t("projects.AddProject")}
            </AddButton>
            <Button
              variant="gradient"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                "Saving..."
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" /> {t("projects.Save")}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

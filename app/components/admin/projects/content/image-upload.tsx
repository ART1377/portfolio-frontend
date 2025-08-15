"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils/cn/cn";
import { Project } from "@/app/types/shared/project/project";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { deleteImage } from "@/app/lib/utils/upload/image";

interface ImageUploadProps {
  project: {
    title: string;
    image: string;
  };
  idx: number;
  baseId: string;
  handleChange: <K extends keyof Project>(
    idx: number,
    field: K,
    value: Project[K]
  ) => void;
  uploadImage: (file: File) => Promise<string>;
  handleSave: () => Promise<void>; // <-- NEW: pass handleSave here
}

export function ImageUpload({
  project,
  idx,
  baseId,
  handleChange,
  uploadImage,
  handleSave, // <-- destructure handleSave
}: ImageUploadProps) {
  const { t } = useTranslation("imageUploader");

  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);

    // Show local preview immediately
    const localPreviewUrl = URL.createObjectURL(file);
    handleChange(idx, "image", localPreviewUrl);

    try {
      const uploadedUrl = await uploadImage(file);
      handleChange(idx, "image", uploadedUrl);
      await handleSave(); // <-- save after successful upload
      toast.success(t("projects.ImageUploadSuccess"));
    } catch {
      toast.error(t("projects.ImageUploadError"));
      handleChange(idx, "image", "");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeImage = async () => {
    if (project.image && !project.image.startsWith("blob:")) {
      try {
        await deleteImage(project.image);
        toast.success(t("projects.ImageDeleteSuccess"));
      } catch {
        toast.error(t("projects.ImageDeleteError"));
      }
    }
    handleChange(idx, "image", "");
    await handleSave();
  };
  return (
    <div className="space-y-4">
      {/* Show image preview ONLY if image exists */}
      {project.image ? (
        <div className="relative group">
          <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-border bg-muted min-h-56">
            {project.image.length > 0 && (
            <Image
                src={
                  project.image.startsWith("blob:")
                    ? project.image
                    : `http://localhost:4000${project.image}` // note the "/" before ${project.image}
                }
                alt={project.title || t("projects.ProjectImageAlt")}
                fill
                className="object-fill transition-all duration-300 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8"
              onClick={removeImage}
              disabled={isUploading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                {t("projects.Uploading")}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Show upload area ONLY if no image */
        <div
          className={cn(
            "relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer",
            "hover:border-primary hover:bg-primary/5",
            isDragOver && "border-primary bg-primary/10 scale-[1.02]",
            "border-muted-foreground/50"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() =>
            document.getElementById(`${baseId}-image-upload`)?.click()
          }
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div
              className={cn(
                "p-4 rounded-full transition-colors duration-300",
                isDragOver
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Upload className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">
                {t("projects.UploadProjectImage")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("projects.DragDropOrClick")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("projects.FileFormats")}
              </p>
            </div>
          </div>

          <input
            id={`${baseId}-image-upload`}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
        </div>
      )}
    </div>
  );
}

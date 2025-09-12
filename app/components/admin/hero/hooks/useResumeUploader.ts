import { useState } from "react";

type Lang = "en" | "fa";

export function useResumeUploader() {
  const [resumeFiles, setResumeFiles] = useState<Partial<Record<Lang, File>>>(
    {}
  );
  const [uploadProgress, setUploadProgress] = useState<
    Partial<Record<Lang, number>>
  >({});

  const setResumeFile = (lang: Lang, file: File) => {
    setResumeFiles((prev) => ({ ...prev, [lang]: file }));
  };

  const handleResumeUpload = (lang: Lang): Promise<void> => {
    const file = resumeFiles[lang];
    if (!file) return Promise.resolve();

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("lang", lang);

    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${process.env.NEXT_PUBLIC_API_URL}/hero/upload-resume`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100
          );
          setUploadProgress((prev) => ({ ...prev, [lang]: percentComplete }));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadProgress((prev) => ({ ...prev, [lang]: 100 }));
          resolve();
        } else {
          reject(new Error("Upload failed"));
        }
      };

      xhr.onerror = () => {
        reject(new Error("Upload error"));
      };

      xhr.send(formData);
    });
  };

  return {
    resumeFiles,
    setResumeFile,
    handleResumeUpload,
    uploadProgress,
  };
}

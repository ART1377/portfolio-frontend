export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/image/upload`, // note the /api here
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Image upload failed");

  const data = await res.json();
  return data.imageUrl;
};


export async function deleteImage(imageUrl: string): Promise<void> {
  const imagePath = imageUrl.replace("http://localhost:4000", "");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: imagePath }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete image");
  }

  // Optionally, revalidate your cache or paths if using ISR
  // revalidatePath('/projects');
}
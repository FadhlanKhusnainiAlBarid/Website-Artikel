import z from "zod";

export const formSchemaCreateArticle = z.object({
  image: z.string().min(1, "Image is required"),
  title: z.string().min(1).max(100),
  // content: z.string().min(1),
  categoryId: z.string().min(1, "Category is required"),
});

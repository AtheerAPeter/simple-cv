import { auth } from "@/auth";
import { z } from "zod";
import axios from "axios";
import { IImgbbResponse } from "@/interfaces/IImgbb";

const uploadImageSchema = z.object({
  image: z.instanceof(File),
});

export const POST = auth(async function POST(request) {
  if (!request.auth?.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const formData = await request.formData();

    const validationResult = uploadImageSchema.safeParse({
      image: formData.get("image"),
    });

    if (!validationResult.success) {
      return new Response(JSON.stringify({ error: "Invalid image data" }), {
        status: 400,
      });
    }

    const imageFile = validationResult.data.image;

    if (!imageFile) {
      return new Response("No image file provided", { status: 400 });
    }

    const formDataToSend = new FormData();
    formDataToSend.append("image", imageFile);

    const response = await axios.post<IImgbbResponse>(
      `https://api.imgbb.com/1/upload?expiration=${60 * 60 * 24 * 7 * 2}&key=${
        process.env.NEXTIMAGEBB_API_KEY
      }`,
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return new Response(JSON.stringify(response.data));
  } catch (error) {
    console.error("Error uploading image:", error);
    return new Response(JSON.stringify({ error: "Failed to upload image" }), {
      status: 500,
    });
  }
});

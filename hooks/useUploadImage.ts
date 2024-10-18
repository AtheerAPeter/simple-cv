import { HttpClient } from "@/Httpclient";
import { useMutation } from "@tanstack/react-query";

export default function useUploadImage() {
  const uploadImageMutation = useMutation({
    mutationFn: HttpClient.DocumentAPi.uploadImage,
  });
  return { uploadImageMutation };
}

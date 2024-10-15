import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

const GoogleOneTap = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Load the Google One Tap script
      const handleCredentialResponse = (response: any) => {
        signIn("google", { credential: response.credential });
      };

      // Initialize Google One Tap
      window.google?.accounts.id.initialize({
        client_id: process.env.AUTH_GOOGLE_ID!,
        callback: handleCredentialResponse,
      });

      window.google?.accounts.id.prompt();
    }
  }, [status]);

  return null;
};

export default GoogleOneTap;

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              className="rounded-full"
              src={session?.user.image!}
              alt={session?.user.name!}
            />
            <AvatarFallback>{session?.user.name!.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-semibold">{session?.user.name}</h2>
            <p className="text-sm text-gray-500">{session?.user.email}</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant={"destructive"}>Logout</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

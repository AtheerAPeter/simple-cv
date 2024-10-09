import { auth, signOut } from "@/auth";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default async function page() {
  const session = await auth();
  const t = await getTranslations("profile");
  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      <SessionProvider>
        <NavBar />
      </SessionProvider>
      <div className="container mx-auto py-10 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0">
                <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
                  <AvatarImage
                    className="rounded-full"
                    src={session?.user?.image!}
                    alt={session?.user?.name!}
                  />
                  <AvatarFallback>
                    {session?.user?.name!.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    {session?.user?.name}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground mt-1">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="mt-4 sm:mt-0">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("logOut")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {t("logOutConfirmTitle")}
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <form
                        action={async () => {
                          "use server";
                          await signOut();
                        }}
                      >
                        <button type="submit">{t("logOut")}</button>
                      </form>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}

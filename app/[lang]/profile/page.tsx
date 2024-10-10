"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";
import { ArrowLeftIcon, LogOut } from "lucide-react";
import { queryClientRoot } from "@/lib/queryClient";
import { placeholderData } from "@/lib/placeholderData";

export default function page() {
  const { data: session, status } = useSession();
  const t = useTranslations("profile");
  const router = useRouter();

  const onLogout = async () => {
    await signOut();
    await queryClientRoot.clear();
    router.replace("/");
  };

  if (status === "unauthenticated") {
    redirect("/");
  }
  if (status === "loading") {
    return null;
  }
  return (
    <>
      <SessionProvider>
        <div className="container mx-auto py-10 px-4 h-full">
          <Card className="mx-auto border-none shadow-none">
            <Button variant="outline" size="icon">
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
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
                      <AvatarImage
                        className="rounded-full"
                        src={
                          "https://i.ibb.co/Y2xvPqm/580413-PS-PAW-BILL-SUIT-scaled-min.jpg"
                        }
                        alt={session?.user?.name!}
                      />
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
                        <Button onClick={onLogout} type="submit">
                          {t("logOut")}
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
          </Card>
        </div>
      </SessionProvider>
    </>
  );
}

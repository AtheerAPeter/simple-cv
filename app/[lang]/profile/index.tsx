"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { signOut } from "next-auth/react";
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
import { ChevronRight, LogOutIcon } from "lucide-react";
import { queryClientRoot } from "@/lib/queryClient";
import useCachedSession from "@/hooks/useCachedSession";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const { session, sessionQuery } = useCachedSession();
  const t = useTranslations("profile");
  const router = useRouter();

  const onLogout = async () => {
    await signOut();
    await queryClientRoot.clear();
    router.replace("/");
  };

  if (session === undefined && !sessionQuery.isFetched) {
    redirect("/");
  }
  if (sessionQuery.isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container mx-auto h-full flex-1 max-w-xl pt-28">
      <div className="flex flex-col items-center">
        <Avatar className="w-24 h-24">
          <AvatarImage
            className="rounded-full"
            src={session?.data?.user?.image!}
            alt={session?.data?.user?.name!}
          />
          <AvatarFallback>
            <AvatarImage
              className="rounded-full"
              src={
                "https://i.ibb.co/Y2xvPqm/580413-PS-PAW-BILL-SUIT-scaled-min.jpg"
              }
              alt={session?.data?.user?.name!}
            />
          </AvatarFallback>
        </Avatar>
        <h1 className="font-bold text-xl">{session?.data?.user?.name}</h1>
        <p className="text-muted-foreground">{session?.data?.user?.email}</p>
      </div>
      <Separator className="my-4" />
      <ul className="container mx-auto px-6 lg:px-0">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <li className="flex items-center gap-2 text-red-400 cursor-pointer justify-between">
              <div className="flex items-center gap-2">
                <LogOutIcon className="h-4 w-4" />
                {t("logOut")}
              </div>
              <ChevronRight className="h-4 w-4" />
            </li>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("logOutConfirmTitle")}</AlertDialogTitle>
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
      </ul>
    </div>
  );
}

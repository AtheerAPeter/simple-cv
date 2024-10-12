"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { LanguageSwitcherComponent } from "./language-switcher";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { useCachedSession } from "@/hooks/useCachedSession";
import { useRouter } from "next/navigation";

export const NavBar = () => {
  const locale = useLocale();
  const { session, sessionQuery } = useCachedSession();
  const t = useTranslations("profile");
  const router = useRouter();

  return (
    <header className="w-full py-4">
      <nav className="flex justify-between items-center container mx-auto lg:px-0 px-4">
        <Link href={`/${locale}`}>
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcherComponent />
          {sessionQuery.isFetching ? (
            <LoadingSpinner />
          ) : session?.status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage
                    src={session?.data?.user?.image || ""}
                    alt={session?.data?.user?.name || ""}
                  />
                  <AvatarFallback>
                    {session?.data?.user?.name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="shadow-none">
                <DropdownMenuItem
                  onSelect={() => router.push(`/${locale}/profile`)}
                >
                  <User className="mr-2 h-4 w-4" />

                  {t("profile")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn("google")}>{t("signIn")}</Button>
          )}
        </div>
      </nav>
    </header>
  );
};

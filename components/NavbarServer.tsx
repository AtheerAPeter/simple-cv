"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { LanguageSwitcherComponent } from "./language-switcher";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

export const NavBarServer = () => {
  const locale = useLocale();
  const t = useTranslations("profile");
  return (
    <header className="w-full mx-auto fixed top-0 z-20 flex justify-center pt-4 px-4 lg:px-0">
      <nav className="flex justify-between items-center container mx-auto bg-white shadow-md rounded-xl w-full lg:contain-none lg:w-1/2 p-2">
        <Link href={`/${locale}`}>
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcherComponent />
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => signIn("google")}
          >
            {t("signIn")}
          </Button>
        </div>
      </nav>
    </header>
  );
};

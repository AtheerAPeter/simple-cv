"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcherComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState("");

  useEffect(() => {
    const lang = pathname.split("/")[1];
    setCurrentLang(lang);
  }, [pathname]);

  const switchLanguage = (lang: string) => {
    const newPathname = pathname.replace(/^\/[^\/]+/, `/${lang}`);
    router.push(newPathname);
    setCurrentLang(lang);
  };

  const getLocalizedPath = (lang: string) => {
    return pathname.replace(/^\/[^\/]+/, `/${lang}`);
  };

  return (
    <div className="flex items-center space-x-2 text-sm font-medium">
      <div className="flex items-center">
        <Link
          href={getLocalizedPath("en")}
          className={cn(
            "transition-colors hover:text-primary",
            currentLang === "en" ? "text-black" : "text-gray-500"
          )}
          onClick={(e) => {
            e.preventDefault();
            switchLanguage("en");
          }}
        >
          EN
        </Link>

        <span className="text-muted-foreground mx-2">|</span>

        <Link
          href={getLocalizedPath("de")}
          className={cn(
            "transition-colors hover:text-primary",
            currentLang === "de" ? "text-black" : "text-gray-500"
          )}
          onClick={(e) => {
            e.preventDefault();
            switchLanguage("de");
          }}
        >
          DE
        </Link>
      </div>
    </div>
  );
}

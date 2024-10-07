"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useLocale } from "next-intl";
import { LanguageSwitcherComponent } from "./language-switcher";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import { LoadingSpinner } from "./ui/LoadingSpinner";

export const NavBar = () => {
  const locale = useLocale();
  const { data: session, status } = useSession();

  return (
    <header className="w-full py-4 mb-8">
      <nav className="flex justify-between items-center container mx-auto lg:px-0 px-4">
        <Link href={`/${locale}`}>
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcherComponent />
          {status === "loading" ? (
            <LoadingSpinner />
          ) : status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>
                    {session?.user?.name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <Link className="flex-1" href={`/${locale}/profile`}>
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn()}>Sign In</Button>
          )}
        </div>
      </nav>
    </header>
  );
};

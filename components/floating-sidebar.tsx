"use client";
import {
  Building,
  FilePenLine,
  FileText,
  LetterText,
  LucideLetterText,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function FloatingSidebarComponent() {
  const { data: session } = useSession();
  const router = useRouter();
  const locale = useLocale();
  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed bottom-4 left-4 items-center p-1 bg-white rounded-full z-30 border border-gray-200 shadow-xl hidden lg:flex">
        <nav className="flex flex-col items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Link href={`/${locale}/cv-builder`}>
                  <div>
                    <FilePenLine className="h-5 w-5 text-gray-700" />
                    <span className="sr-only">CV Builder</span>
                  </div>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>CV Builder</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Link href={`/${locale}/cover-letter-creator`}>
                  <div>
                    <LucideLetterText className="h-5 w-5 text-gray-700" />
                    <span className="sr-only">Cover Letter</span>
                  </div>
                </Link>
                {/* Ensure only one child is passed to TooltipTrigger */}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Cover Letter</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar
                className="h-9 w-9 cursor-pointer"
                onClick={() => {
                  router.push(`/${locale}/profile`);
                }}
              >
                <AvatarImage
                  className="rounded-full"
                  src={session?.user?.image || ""}
                  alt={session?.user?.name || ""}
                />
                <AvatarFallback>
                  {session?.user?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
        </nav>
      </div>
    </TooltipProvider>
  );
}

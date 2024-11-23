import createMiddleware from "next-intl/middleware";
import { defineRouting } from "next-intl/routing";

const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "de"],

  // Used when no locale matches
  defaultLocale: "de",
});

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(de|en)/:path*"],
};

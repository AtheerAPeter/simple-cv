import createMiddleware from "next-intl/middleware";
import { routing } from "./app/i18n/routing";
// export { auth as middleware } from "./lib/auth";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(de|en)/:path*"],
};

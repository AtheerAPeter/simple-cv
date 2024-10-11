import { Github, Linkedin } from "lucide-react";
import Logo from "./Logo";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export const Footer = () => {
  const locale = useLocale();
  const t = useTranslations("home");

  return (
    <footer className="w-full py-4 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4 mb-6 lg:mb-0">
            <Logo />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date().getFullYear()} Smart CV
            </p>
          </div>
          <nav className="flex space-x-4 text-sm justify-center lg:justify-start w-full lg:w-auto">
            <Link
              href={`/${locale}/dashboard`}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {t("common.cvBuilder")}
            </Link>
            <Link
              href="#features"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {t("features.title")}
            </Link>
          </nav>
          <div className="flex space-x-4 text-sm items-center w-full lg:w-auto justify-center lg:justify-start mt-4 lg:mt-0">
            <Link
              href="https://github.com/AtheerAPeter"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
            >
              <Github className="h-4 w-4 mr-1" />
              Github
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/atheer-a-peter-6723b9191/"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
            >
              <Linkedin className="h-4 w-4 mr-1" />
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

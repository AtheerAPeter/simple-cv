import Link from "next/link";
import { LanguageSwitcherComponent } from "./language-switcher";
import Logo from "./Logo";
import { useLocale } from "next-intl";

export const NavBar = () => {
  const locale = useLocale();
  return (
    <header className="w-full  py-4 mb-8">
      <nav className="flex justify-between items-center container mx-auto lg:px-0 px-4">
        <Link href={`/${locale}`}>
          <Logo />
        </Link>
        <div className="gap-4 flex itmes-center">
          <LanguageSwitcherComponent />
        </div>
      </nav>
    </header>
  );
};

import Link from "next/link";
import { LanguageSwitcherComponent } from "./language-switcher";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { useLocale, useTranslations } from "next-intl";

interface Props {
  getStarted?: boolean;
}

export const NavBar = (props: Props) => {
  const locale = useLocale();
  const t = useTranslations("home");
  return (
    <header className="w-full  py-4 mb-8">
      <nav className="flex justify-between items-center container mx-auto lg:px-0 px-4">
        <Link href={`/${locale}`}>
          <Logo />
        </Link>
        <div className="gap-4 flex itmes-center">
          <LanguageSwitcherComponent />
          {props.getStarted ? (
            <Link href={`${locale}/services`}>
              <Button className="font-bold" size={"lg"}>
                {t("button")}
              </Button>
            </Link>
          ) : null}
        </div>
      </nav>
    </header>
  );
};

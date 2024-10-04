import { useTranslations } from "next-intl";

export function AiMagicCircle() {
  const t = useTranslations("home.mock");
  return (
    <div className="relative transform w-24 h-24 bg-white rounded-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 animate-spin"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30"></div>
      <span className="relative z-10 text-sm font-semibold text-gray-800">
        {t("atmagic")}
      </span>
    </div>
  );
}

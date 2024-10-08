import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Props {
  updated?: boolean;
}
const MockCV = (props?: Props) => {
  const t = useTranslations("home.mock");
  return (
    <div
      className={cn(
        "bg-white p-4 border-2 border-gray-200 rounded-lg w-[200px] relative",
        {
          "border-white": props?.updated,
        }
      )}
    >
      {props?.updated && (
        <div className="absolute -inset-0 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-75 blur-md -z-10" />
      )}
      <div>
        {/* header */}
        <div className="flex itmes-center justify-between">
          <div className="w-12 h-12 bg-gray-200 rounded-sm mr-2" />
          <div>
            <div className="h-2 w-20 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
            <div className="h-2 w-20 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
            <div className="h-2 w-20 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
            <div className="h-2 w-20 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
        <div>
          <p className="text-[8px] mt-2">
            <strong>{t("mockcv.experience")}</strong>
          </p>
          <div className="h-2 w-full mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div
            className={cn("h-2 w-full mb-1 flex-1 bg-gray-200 rounded-lg", {
              "bg-purple-200": props?.updated,
            })}
          ></div>
          <div
            className={cn("h-2 w-full mb-1 flex-1 bg-gray-200 rounded-lg", {
              "bg-blue-200": props?.updated,
            })}
          ></div>

          <div
            className={cn("h-2 w-full mb-1 flex-1 bg-gray-200 rounded-lg", {
              "bg-indigo-200": props?.updated,
            })}
          ></div>
          <p className="text-[8px] mt-2">
            <strong>{t("mockcv.skills")}</strong>
          </p>
          <div className="h-2 w-full mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="flex items-center w-full justify-between gap-2">
            <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
            <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
            <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
            <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="flex items-center w-full justify-between gap-2">
            <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
            <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
            <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          </div>
          <div
            className={cn("h-2 w-full mb-1 flex-1 bg-gray-200 rounded-lg", {
              "bg-blue-200": props?.updated,
            })}
          ></div>
          <div className="h-2 mb-1 w-8 flex-1 bg-gray-200 rounded-lg mt-2"></div>
          <div className="flex items-center w-full justify-between gap-2">
            <div
              className={cn("h-2 w-full mb-1 flex-1 bg-gray-200 rounded-lg", {
                "bg-purple-200": props?.updated,
              })}
            ></div>
            <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
            <div
              className={cn("h-2 w-full mb-1 flex-1 bg-gray-200 rounded-lg", {
                "bg-blue-200": props?.updated,
              })}
            ></div>
          </div>
          <div className="h-2 w-full mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div
            className={cn("h-2 w-full mb-1 flex-1 bg-gray-200 rounded-lg", {
              "bg-blue-200": props?.updated,
            })}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MockCV;

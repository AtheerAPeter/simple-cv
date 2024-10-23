import { ArrowLeftIcon, SaveIcon, CircleX } from "lucide-react";
import { LanguageSwitcherComponent } from "../../../components/language-switcher";
import { Button } from "../../../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { useTranslations } from "next-intl";

interface Props {
  onBack: () => void;
  onClearAll: () => void;
  onSave: () => void;
  isSaving: boolean;
}

const CoverLetterPageHeader = (props: Props) => {
  const t = useTranslations("common");
  return (
    <TooltipProvider>
      <div>
        <header className="flex justify-between mb-8">
          <Button
            variant="outline"
            className="rounded-full"
            size="icon"
            onClick={props.onBack}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-4">
            <LanguageSwitcherComponent />
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="rounded-none rounded-l-full"
                    variant="outline"
                    size="icon"
                    onClick={props.onClearAll}
                  >
                    <CircleX className="h-4 w-4" />
                    <span className="sr-only">{t("clear")}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("clear")}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="rounded-none rounded-r-full"
                    isLoading={props.isSaving}
                    disabled={props.isSaving}
                    variant="outline"
                    size="icon"
                    onClick={props.onSave}
                  >
                    <SaveIcon className="h-4 w-4" />
                    <span className="sr-only">{t("save")}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("save")}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </header>
      </div>
    </TooltipProvider>
  );
};

export default CoverLetterPageHeader;

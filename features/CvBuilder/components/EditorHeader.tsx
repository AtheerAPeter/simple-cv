import { Button } from "@/components/ui/button";
import useTemplateStore from "@/stores/templateStore";
import { ArrowLeftIcon, CircleX, SaveIcon, Share2 } from "lucide-react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useTranslations } from "next-intl";
import { LanguageSwitcherComponent } from "@/components/language-switcher";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  onClearAll: () => void;
  onSave: () => void;
  onBack: () => void;
  isSaving: boolean;
  onShare: (template: string, color: string) => void;
}

export default function EditorHeader(props: Props) {
  const { color, setColor, template, setTemplate } = useTemplateStore();
  const t = useTranslations("common");
  return (
    <TooltipProvider>
      <header className="flex justify-between mb-8">
        <Button
          className="rounded-full"
          variant="outline"
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
                  className="rounded-none"
                  variant="outline"
                  size="icon"
                  onClick={() => props.onShare(template, color)}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">{t("share")}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("share")}</p>
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
    </TooltipProvider>
  );
}

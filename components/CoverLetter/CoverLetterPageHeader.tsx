import { ArrowLeftIcon, TrashIcon, SaveIcon } from "lucide-react";
import { LanguageSwitcherComponent } from "../language-switcher";
import { Button } from "../ui/button";

interface Props {
  onBack: () => void;
  onClearAll: () => void;
  onSave: () => void;
}

const CoverLetterPageHeader = (props: Props) => {
  return (
    <div className="container mx-auto">
      <header className="flex justify-between mb-8">
        <Button variant="outline" size="icon" onClick={props.onBack}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-4">
          <LanguageSwitcherComponent />
          <Button variant="outline" size="icon" onClick={props.onClearAll}>
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Clear</span>
          </Button>
          <Button variant="outline" size="icon" onClick={props.onSave}>
            <SaveIcon className="h-4 w-4" />
            <span className="sr-only">Save</span>
          </Button>
        </div>
      </header>
    </div>
  );
};

export default CoverLetterPageHeader;

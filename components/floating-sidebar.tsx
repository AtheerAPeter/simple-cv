"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, File, FileText } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useDocument } from "@/hooks/useDocument";
import Link from "next/link";
import { EditableDocumentTitleComponent } from "./editable-document-title";

interface Props {
  documentTitle?: string;
  documentId?: string;
}

export function FloatingSidebarComponent(props: Props) {
  const { list, listQuery, updateMutation } = useDocument({
    listEnabled: true,
  });
  const locale = useLocale();
  const t = useTranslations("common");
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleBubble = () => setIsOpen(!isOpen);

  const onUpdateTitle = async (newTitle: string) => {
    if (!props.documentId) return;
    const response = await updateMutation.mutateAsync({
      id: props.documentId!,
      title: newTitle,
    });
    if (response) {
      listQuery.refetch();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 left-4 z-50 lg:right-4 lg:left-auto"
    >
      <motion.div initial={false} animate={isOpen ? "open" : "closed"}>
        <motion.button
          className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75"
          onClick={toggleBubble}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close tools" : "Open tools"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="bubble"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-3 h-3 bg-primary-foreground rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute bottom-16 left-0 lg:right-0 lg:left-auto bg-background rounded-lg border shadow-xl p-4 w-72"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">
                  {t("myDocuments")}
                </h3>
                <ul className="space-y-2">
                  {list?.map((file, index) => (
                    <motion.li
                      key={file.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={
                          file.type === "cv"
                            ? `/${locale}/cv-builder/${file.id}`
                            : `/${locale}/cover-letter-creator/${file.id}`
                        }
                      >
                        <button className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-muted text-left text-sm">
                          <div className="h-4 w-4">
                            {file.type === "cv" ? (
                              <File className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                          </div>
                          <span className="truncate">{file.title}</span>
                        </button>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                {/* <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => console.log("Add file clicked")}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add File
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => console.log("Action clicked")}
                  >
                    Action
                  </Button>
                </div> */}
                <div>
                  <label
                    htmlFor="documentTitle"
                    className="text-sm font-medium text-gray-700"
                  >
                    File Name
                  </label>
                  <EditableDocumentTitleComponent
                    initialTitle={props.documentTitle || ""}
                    onSave={onUpdateTitle}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

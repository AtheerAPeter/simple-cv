"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, File, Plus, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function EnhancedBubbleButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleBubble = () => setIsOpen(!isOpen)

  const files = [
    { name: "document.pdf", type: "pdf" },
    { name: "image.jpg", type: "image" },
    { name: "spreadsheet.xlsx", type: "spreadsheet" },
  ]

  return (
    <div ref={containerRef} className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
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
              className="absolute bottom-16 right-0 bg-background rounded-lg shadow-lg p-4 w-72"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Files</h3>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <motion.li
                      key={file.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-muted text-left text-sm"
                        onClick={() => console.log(`Clicked ${file.name}`)}
                      >
                        <File className="h-4 w-4" />
                        <span>{file.name}</span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <div className="flex space-x-2">
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
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Enter text..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      console.log("Sent:", inputValue)
                      setInputValue("")
                    }}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
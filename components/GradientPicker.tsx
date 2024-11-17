"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Paintbrush } from "lucide-react";
import { useState } from "react";

export function PickerExample() {
  const [background, setBackground] = useState("#B4D455");

  return (
    <div
      className="w-full h-full preview flex min-h-[350px] justify-center p-10 items-center rounded !bg-cover !bg-center transition-all"
      style={{ background }}
    >
      <GradientPicker background={background} setBackground={setBackground} />
    </div>
  );
}

export function GradientPicker({
  background,
  setBackground,
  className,
}: {
  background: string;
  setBackground: (background: string) => void;
  className?: string;
}) {
  const solids = [
    "#000000", // Black
    "#4f4f4f", // Dark Gray
    "#6b7280", // Gray
    "#E2E2E2", // Light Gray
    "#3b82f6", // Blue
    "#3aacf2", // Light Blue
    "#0D59F2", // Sky Blue
    "#6366f1", // Indigo
    "#5f3dd6", // Light Indigo
    "#8b5cf6", // Purple
    "#7f3acf", // Light Purple
    "#cd93ff", // Lavender
    "#ec4899", // Pink
    "#ff75c3", // Light Pink
    "#ef4444", // Rose
    "#f43f5e", // Light Rose
    "#f97316", // Orange
    "#f6a34c", // Light Orange
    "#ffa647", // Amber
    "#eab308", // Yellow
    "#ffe83f", // Light Yellow
    "#e5d08b", // Pale Yellow
    "#22c55e", // Green
    "#16a34a", // Dark Green
    "#9fff5b", // Light Green
    "#14b8a6", // Teal
    "#10b981", // Light Teal
    "#70e2ff", // Cyan
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !background && "text-muted-foreground",
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="truncate flex-1">
              {background ? background : "Pick a color"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-wrap gap-1 mt-0">
          {solids.map((s) => (
            <div
              key={s}
              style={{ background: s }}
              className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
              onClick={() => setBackground(s)}
            />
          ))}
        </div>

        <Input
          id="custom"
          value={background}
          className="col-span-2 h-8 mt-4"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  description: string;
  image: string;
  side: "left" | "right";
}

export default function ShowcaseItem(props: Props) {
  return (
    <>
      <div className="relative h-[400px] hidden lg:block">
        <div
          className={cn("container mx-auto flex items-center h-full", {
            "justify-end": props.side === "left",
            "justify-start": props.side === "right",
          })}
        >
          <div className="flex-1 pr-8">
            {props.side === "right" && (
              <div>
                <h1 className="font-bold text-3xl">{props.title}</h1>
                <p className="text-gray-600">{props.description}</p>
              </div>
            )}
          </div>
          <div className="flex-1 pl-8">
            {props.side === "left" && (
              <div>
                <h1 className="font-bold text-3xl">{props.title}</h1>
                <p className="text-gray-600">{props.description}</p>
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex-1 absolute border border-muted-foreground/20 overflow-hidden h-full w-1/2 top-0 bg-white",
              {
                "rounded-r-full left-0": props.side === "left",
                "rounded-l-full right-0": props.side === "right",
              }
            )}
          >
            <div
              className={cn("absolute inset-0 pointer-events-none z-10", {
                "rounded-r-full": props.side === "left",
                "rounded-l-full": props.side === "right",
              })}
              style={{
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)",
              }}
            />
            <Image
              className="flex-1 absolute inset-0"
              objectFit="contain"
              src={props.image}
              alt={props.title}
              fill
            />
          </div>
        </div>
      </div>
      {/* mobile */}

      <div className="h-[400px] lg:hidden">
        <div className={cn("h-full flex flex-col gap-4")}>
          <div
            className={cn(
              "overflow-hidden h-1/2 lg:h-full w-[90%] bg-white relative",
              {
                "rounded-r-full self-start": props.side === "left",
                "rounded-l-full self-end": props.side === "right",
              }
            )}
          >
            <div
              className={cn("absolute inset-0 pointer-events-none z-10", {
                "rounded-r-full": props.side === "left",
                "rounded-l-full": props.side === "right",
              })}
              style={{
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)",
              }}
            />
            <Image
              className="flex-1 absolute inset-0"
              objectFit="contain"
              src={props.image}
              alt={props.title}
              fill
            />
          </div>
          <div className="flex-1 justify-end px-8">
            <div>
              <h1 className="font-bold text-3xl">{props.title}</h1>
              <p className="text-gray-600">{props.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

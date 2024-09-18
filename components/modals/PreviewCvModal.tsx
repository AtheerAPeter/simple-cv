import React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export default function PreviewCvModal({ open, setOpen, children }: Props) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="h-[90vh]">{children}</DrawerContent>
    </Drawer>
  );
}

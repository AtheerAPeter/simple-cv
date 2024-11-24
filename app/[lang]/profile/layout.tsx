"use client";
import { NavBar } from "@/components/NavBar";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout(props: Props) {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
}

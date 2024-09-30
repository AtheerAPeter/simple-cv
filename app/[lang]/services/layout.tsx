import Footer from "@/components/Footer";
import { NavBar } from "@/components/NavBar";

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout(props: Props) {
  return (
    <div className="h-screen flex flex-col justify-between">
      <NavBar getStarted={false} />
      {props.children}
      <Footer />
    </div>
  );
}

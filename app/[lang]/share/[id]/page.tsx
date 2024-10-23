import SharePage from "@/features/Share";

export default function Page({ params }: { params: { id: string } }) {
  return <SharePage params={params} />;
}

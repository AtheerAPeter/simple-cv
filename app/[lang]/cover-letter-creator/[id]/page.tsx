import CoverLetterBuilder from "@/features/CoverLetterBuilder";

export default function Page({ params }: { params: { id: string } }) {
  return <CoverLetterBuilder params={params} />;
}

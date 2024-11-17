import CoverLetterBuilder from ".";

export default function Page({ params }: { params: { id: string } }) {
  return <CoverLetterBuilder params={params} />;
}

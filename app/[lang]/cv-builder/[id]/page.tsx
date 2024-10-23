import CVBuilder from "@/features/CvBuilder";

export default function Page({ params }: { params: { id: string } }) {
  return <CVBuilder params={params} />;
}

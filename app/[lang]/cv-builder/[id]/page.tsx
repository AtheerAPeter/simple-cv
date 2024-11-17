import CVBuilder from ".";

export default function Page({ params }: { params: { id: string } }) {
  return <CVBuilder params={params} />;
}

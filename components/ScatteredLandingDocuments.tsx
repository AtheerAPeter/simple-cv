import ScatteredCvBuilder from "./ScatteredCvBuilder";
import ScatteredDashboard from "./ScatteredDashboard";

export default function ScatteredLandingDocuments() {
  return (
    <div className="hidden lg:block md:block">
      <ScatteredDashboard />
      <ScatteredCvBuilder />
    </div>
  );
}

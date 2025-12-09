import ArrangementCard from "@/components/ArrangementCard";
import { arrangementer } from "@/data/arrangementer";

export default function ArrangementerPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-4xl font-bold text-(--primary)">Arrangementer</h1>

      {arrangementer.map((event) => (
        <ArrangementCard key={event.id} {...event} />
      ))}
    </div>
  );
}

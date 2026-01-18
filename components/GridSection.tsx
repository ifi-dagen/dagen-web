// For a lage grid (matriser), f.eks. styremedlemmer

type GridSectionProps = {
  title?: string;
  children: React.ReactNode;
  columns?: string;
};

export default function GridSection({ 
  title, 
  children, 
  columns = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
}: GridSectionProps) {
  const columnsWidth = 
    columns === "auto"
      ? "grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]"
      : columns
  return (
    <div className="space-y-4 text-center max-w-5xl mx-auto">
      {title && <h2 className="text-4xl font-bold text-primary">{title}</h2>}
      <div className={`grid ${columnsWidth} gap-6`}>
        {children}
      </div>
    </div>
  );
}

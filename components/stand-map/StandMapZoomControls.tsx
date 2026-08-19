type StandMapZoomControlsProps = {
  zoom: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
};

export default function StandMapZoomControls({
  zoom,
  canZoomIn,
  canZoomOut,
  onZoomIn,
  onZoomOut,
}: StandMapZoomControlsProps) {
  return (
    <div
      role="group"
      aria-label="Zoom i standkartet"
      className="flex items-center rounded-full border border-button-outline bg-background p-1 font-mono shadow-lg"
    >
      <button
        type="button"
        onClick={onZoomOut}
        disabled={!canZoomOut}
        aria-label="Zoom ut"
        className="flex h-11 w-11 items-center justify-center rounded-full text-2xl leading-none transition hover:bg-button-hover disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        −
      </button>
      <output
        aria-live="polite"
        className="min-w-14 text-center text-xs tabular-nums"
      >
        {Math.round(zoom * 100)}%
      </output>
      <button
        type="button"
        onClick={onZoomIn}
        disabled={!canZoomIn}
        aria-label="Zoom inn"
        className="flex h-11 w-11 items-center justify-center rounded-full text-2xl leading-none transition hover:bg-button-hover disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        +
      </button>
    </div>
  );
}

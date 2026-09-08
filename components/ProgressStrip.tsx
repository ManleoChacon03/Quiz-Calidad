"use client";

export default function ProgressStrip({
  total,
  currentIndex,
  answeredMask,
}: {
  total: number;
  currentIndex: number;
  answeredMask: boolean[];
}) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 w-full">
      {Array.from({ length: total }).map((_, i) => {
        const isCurrent = i === currentIndex;
        const isAnswered = answeredMask[i];
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <div
              className={[
                "h-1.5 w-full rounded-none transition-colors",
                isCurrent
                  ? "bg-umgred"
                  : isAnswered
                  ? "bg-ink"
                  : "bg-ink/15",
              ].join(" ")}
            />
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import { questions } from "@/lib/questions";
import type { Answer, Student } from "@/lib/types";
import { generateCertificate } from "@/lib/pdf";

export default function ResultsScreen({
  student,
  answers,
  onRestart,
}: {
  student: Student;
  answers: Answer[];
  onRestart: () => void;
}) {
  const [downloading, setDownloading] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const correctCount = answers.filter(
    (a, i) => a.selectedIndex === questions[i].correctIndex
  ).length;
  const total = questions.length;
  const percentage = Math.round((correctCount / total) * 100);
  const passed = percentage >= 60;

  async function handleDownload() {
    setDownloading(true);
    try {
      await generateCertificate(student, answers);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-14">
      <div className="w-full max-w-2xl mx-auto">
        <p className="font-mono text-[11px] text-ink/60 mb-2">
          {student.name} &middot; {student.carnet}
        </p>
        <h1 className="font-display text-3xl text-ink mb-8">
          Resultado del cuestionario
        </h1>

        <div
          className={[
            "border px-6 py-6 sm:px-8 sm:py-7 mb-8 flex items-center justify-between flex-wrap gap-4",
            passed ? "border-pass/40 bg-pass/[0.06]" : "border-fail/40 bg-fail/[0.06]",
          ].join(" ")}
        >
          <div>
            <p className="font-mono text-[11px] tracking-wide text-ink/60 mb-1">
              PUNTAJE FINAL
            </p>
            <p className="font-display text-4xl text-ink">
              {correctCount}/{total}{" "}
              <span className="text-lg text-ink/50 font-sans align-middle">
                ({percentage}%)
              </span>
            </p>
          </div>
          <span
            className={[
              "font-mono text-xs tracking-wide px-3 py-1.5 border",
              passed
                ? "border-pass text-pass"
                : "border-fail text-fail",
            ].join(" ")}
          >
            {passed ? "APROBADO" : "NO APROBADO"}
          </span>
        </div>

        <div className="flex flex-col gap-2 mb-9">
          {questions.map((q, i) => {
            const ans = answers[i];
            const isCorrect = ans?.selectedIndex === q.correctIndex;
            const isOpen = expanded === i;
            return (
              <div key={q.id} className="border border-ink/12 bg-white/50">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                >
                  <span
                    className={[
                      "font-mono text-xs w-5 h-5 flex items-center justify-center shrink-0 border",
                      isCorrect
                        ? "border-pass text-pass"
                        : "border-fail text-fail",
                    ].join(" ")}
                  >
                    {isCorrect ? "✓" : "✕"}
                  </span>
                  <span className="text-sm text-ink flex-1">{q.prompt}</span>
                  <span className="font-mono text-[10px] text-ink/40">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pl-[44px] text-sm text-ink/75 space-y-1.5">
                    <p>
                      <span className="text-ink/50">Tu respuesta: </span>
                      {ans?.selectedIndex !== null &&
                      ans?.selectedIndex !== undefined
                        ? q.options[ans.selectedIndex]
                        : "Sin responder"}
                    </p>
                    {!isCorrect && (
                      <p>
                        <span className="text-ink/50">
                          Respuesta correcta:{" "}
                        </span>
                        {q.options[q.correctIndex]}
                      </p>
                    )}
                    <p className="text-ink/60 pt-1">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 bg-ink text-paper text-sm font-medium tracking-wide py-3.5 hover:bg-umgred transition-colors disabled:opacity-60"
          >
            {downloading ? "Generando PDF…" : "Descargar constancia en PDF"}
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="sm:w-48 border border-ink/25 text-ink text-sm font-medium tracking-wide py-3.5 hover:border-ink transition-colors"
          >
            Repetir cuestionario
          </button>
        </div>
      </div>
    </main>
  );
}

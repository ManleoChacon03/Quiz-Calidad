"use client";

import { useState } from "react";
import { questions } from "@/lib/questions";
import type { Answer, Student } from "@/lib/types";
import ProgressStrip from "./ProgressStrip";

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

export default function QuizScreen({
  student,
  onComplete,
}: {
  student: Student;
  onComplete: (answers: Answer[]) => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(
    questions.map((q) => ({ questionId: q.id, selectedIndex: null }))
  );

  const question = questions[index];
  const total = questions.length;
  const isLast = index === total - 1;
  const selected = answers[index]?.selectedIndex ?? null;
  const answeredMask = answers.map((a) => a.selectedIndex !== null);

  function selectOption(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = { questionId: question.id, selectedIndex: optionIndex };
      return next;
    });
  }

  function goNext() {
    if (selected === null) return;
    if (isLast) {
      onComplete(answers);
    } else {
      setIndex((i) => i + 1);
    }
  }

  function goBack() {
    if (index > 0) setIndex((i) => i - 1);
  }

  return (
    <main className="min-h-screen flex flex-col px-6 py-10 sm:py-14">
      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[11px] text-ink/60">
            {student.name.split(" ")[0]} &middot; {student.carnet}
          </p>
          <p className="font-mono text-[11px] text-ink/60 status-tick">
            PREGUNTA {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>

        <ProgressStrip
          total={total}
          currentIndex={index}
          answeredMask={answeredMask}
        />

        <div className="mt-10 flex-1">
          <h2 className="font-display text-2xl sm:text-[28px] leading-snug text-ink mb-8">
            {question.prompt}
          </h2>

          <div className="flex flex-col gap-3">
            {question.options.map((opt, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectOption(i)}
                  className={[
                    "text-left flex items-start gap-4 border px-4 py-3.5 sm:px-5 sm:py-4 transition-colors",
                    isSelected
                      ? "border-umgred bg-umgred/[0.06]"
                      : "border-ink/15 bg-white/50 hover:border-ink/35",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "font-mono text-xs w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 border",
                      isSelected
                        ? "border-umgred text-umgred"
                        : "border-ink/25 text-ink/50",
                    ].join(" ")}
                  >
                    {OPTION_LETTERS[i]}
                  </span>
                  <span className="text-[15px] leading-snug text-ink pt-0.5">
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={index === 0}
            className="font-mono text-xs tracking-wide text-ink/50 hover:text-ink disabled:opacity-0 disabled:pointer-events-none transition-colors"
          >
            &larr; ANTERIOR
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={selected === null}
            className="bg-ink text-paper text-sm font-medium tracking-wide px-7 py-3 hover:bg-umgred transition-colors disabled:bg-ink/20 disabled:cursor-not-allowed"
          >
            {isLast ? "Finalizar cuestionario" : "Siguiente"}
          </button>
        </div>
      </div>
    </main>
  );
}

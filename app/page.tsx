"use client";

import { useState } from "react";
import LoginScreen from "@/components/LoginScreen";
import QuizScreen from "@/components/QuizScreen";
import ResultsScreen from "@/components/ResultsScreen";
import type { Answer, Stage, Student } from "@/lib/types";

export default function Home() {
  const [stage, setStage] = useState<Stage>("login");
  const [student, setStudent] = useState<Student | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  function handleStart(s: Student) {
    setStudent(s);
    setStage("quiz");
  }

  function handleComplete(a: Answer[]) {
    setAnswers(a);
    setStage("results");
  }

  function handleRestart() {
    setStudent(null);
    setAnswers([]);
    setStage("login");
  }

  if (stage === "login" || !student) {
    return <LoginScreen onStart={handleStart} />;
  }

  if (stage === "quiz") {
    return <QuizScreen student={student} onComplete={handleComplete} />;
  }

  return (
    <ResultsScreen
      student={student}
      answers={answers}
      onRestart={handleRestart}
    />
  );
}

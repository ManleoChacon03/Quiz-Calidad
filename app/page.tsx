"use client";

import { useState } from "react";
import LoginScreen from "@/components/LoginScreen";
import QuizScreen from "@/components/QuizScreen";
import ResultsScreen from "@/components/ResultsScreen";
import type { Answer, Stage, Student } from "@/lib/types";
import DevToolsGuard from "@/components/DevToolsGuard";

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

  let content;
  if (stage === "login" || !student) {
    content = <LoginScreen onStart={handleStart} />;
  } else if (stage === "quiz") {
    content = <QuizScreen student={student} onComplete={handleComplete} />;
  } else {
    content = (
      <ResultsScreen
        student={student}
        answers={answers}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <>
      <DevToolsGuard />
      {content}
    </>
  );
}
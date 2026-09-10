"use client";

import Image from "next/image";
import { useState } from "react";
import type { Student } from "@/lib/types";
import { QUIZ_TITLE, questions } from "@/lib/questions";

const CARNET_PATTERN = /^1190-22-\d{1,6}$/;

function formatCarnetInput(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  // If the user is typing plain digits, help them into 1190-22-xxxx
  if (!raw.includes("-") && digits.length > 0) {
    const rest = digits.startsWith("119022")
      ? digits.slice(6)
      : digits.startsWith("1190")
      ? digits.slice(4)
      : digits;
    return `1190-22-${rest}`.replace(/-$/, "");
  }
  return raw;
}

export default function LoginScreen({
  onStart,
}: {
  onStart: (student: Student) => void;
}) {
  const [name, setName] = useState("");
  const [carnet, setCarnet] = useState("1190-22-");
  const [touched, setTouched] = useState(false);

  const nameValid = name.trim().length >= 3;
  const carnetValid = CARNET_PATTERN.test(carnet.trim());
  const formValid = nameValid && carnetValid;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!formValid) return;
    onStart({ name: name.trim(), carnet: carnet.trim() });
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-20 h-20 mb-5">
            <Image
              src="/umg-logo.png"
              alt="Universidad Mariano Gálvez de Guatemala"
              fill
              sizes="80px"
              className="object-contain"
              priority
            />
          </div>
          <p className="font-mono text-[11px] tracking-wide text-ink/60 mb-2">
            SEMINARIO DE TECNOLOGÍAS DE INFORMACIÓN &middot; UMG
          </p>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight text-ink">
            {QUIZ_TITLE}
          </h1>
          <p className="mt-3 text-sm text-ink/70 max-w-xs">
            Cuestionario de {questions.length} preguntas basado en el
            contenido de la exposición. Ingresa tus datos para comenzar.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="border border-ink/15 bg-white/60 px-6 py-7 sm:px-8 sm:py-8"
        >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block font-mono text-[11px] tracking-wide text-ink/60 mb-1.5"
            >
              NOMBRE COMPLETO
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Mánleo David Chacón Franco"
              className="w-full border-b-2 border-ink/25 bg-transparent py-2 text-base text-ink outline-none focus:border-umgred transition-colors"
            />
            {touched && !nameValid && (
              <p className="mt-1.5 text-xs text-umgred">
                Ingresa tu nombre completo.
              </p>
            )}
          </div>

          <div className="mb-7">
            <label
              htmlFor="carnet"
              className="block font-mono text-[11px] tracking-wide text-ink/60 mb-1.5"
            >
              CARNÉ (formato 1190-22-xxx)
            </label>
            <input
              id="carnet"
              type="text"
              inputMode="numeric"
              value={carnet}
              onChange={(e) => setCarnet(formatCarnetInput(e.target.value))}
              placeholder="1190-22-0000"
              maxLength={13}
              className="w-full border-b-2 border-ink/25 bg-transparent py-2 text-base text-ink font-mono outline-none focus:border-umgred transition-colors"
            />
            {touched && !carnetValid && (
              <p className="mt-1.5 text-xs text-umgred">
                El carné debe tener el formato 1190-22-xxx (3 dígitos).
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-ink text-paper font-medium text-sm tracking-wide py-3.5 hover:bg-umgred transition-colors"
          >
            Iniciar cuestionario
          </button>
        </form>

        <p className="text-center text-[11px] text-ink/45 mt-5 font-mono">
          Tus respuestas no se almacenan en ninguna base de datos.
        </p>
      </div>
    </main>
  );
}

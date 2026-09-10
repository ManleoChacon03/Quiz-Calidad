"use client";

import { useEffect } from "react";

/**
 * Disuasión ante la inspección del cuestionario: bloquea el menú contextual,
 * los atajos de herramientas de desarrollo, la selección de texto y el copiado.
 * No es un bloqueo real -- cualquiera puede abrir DevTools desde el menú del
 * navegador -- solo evita que alguien lo haga por curiosidad o por accidente.
 */
export default function DevToolsGuard() {
  useEffect(() => {
    const bloqueado = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c", "k"].includes(k)) ||
        (e.ctrlKey && ["u", "s", "p"].includes(k)) ||
        (e.metaKey && e.altKey && ["i", "j", "c"].includes(k))
      ) {
        e.preventDefault();
        return false;
      }
    };

    const menu = (e: Event) => e.preventDefault();
    const copiar = (e: Event) => e.preventDefault();

    document.addEventListener("keydown", bloqueado);
    document.addEventListener("contextmenu", menu);
    document.addEventListener("copy", copiar);
    document.addEventListener("cut", copiar);
    document.addEventListener("dragstart", menu);

    const estilo = document.createElement("style");
    estilo.textContent =
      "body{-webkit-user-select:none;user-select:none}input{-webkit-user-select:text;user-select:text}";
    document.head.appendChild(estilo);

    return () => {
      document.removeEventListener("keydown", bloqueado);
      document.removeEventListener("contextmenu", menu);
      document.removeEventListener("copy", copiar);
      document.removeEventListener("cut", copiar);
      document.removeEventListener("dragstart", menu);
      estilo.remove();
    };
  }, []);

  return null;
}
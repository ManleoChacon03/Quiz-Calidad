import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cuestionario · Calidad y Pruebas de Software · UMG",
  description:
    "Cuestionario interactivo sobre Calidad y Pruebas de Software — Seminario de Tecnologías de Información, Universidad Mariano Gálvez de Guatemala.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}

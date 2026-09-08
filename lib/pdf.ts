import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { QUIZ_TITLE, questions } from "./questions";
import type { Answer, Student } from "./types";

async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const res = await fetch("/umg-logo.png");
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function generateCertificate(
  student: Student,
  answers: Answer[]
) {
  const correctCount = answers.filter((a, i) => {
    const q = questions[i];
    return q && a.selectedIndex === q.correctIndex;
  }).length;
  const total = questions.length;
  const percentage = Math.round((correctCount / total) * 100);

  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 48;

  const ink: [number, number, number] = [18, 32, 58];
  const red: [number, number, number] = [140, 15, 34];
  const gold: [number, number, number] = [174, 138, 68];
  const grey: [number, number, number] = [90, 96, 110];

  // Header band
  doc.setFillColor(...ink);
  doc.rect(0, 0, pageWidth, 92, "F");
  doc.setFillColor(...red);
  doc.rect(0, 92, pageWidth, 3, "F");
  doc.setFillColor(...gold);
  doc.rect(0, 95, pageWidth, 2, "F");

  const logoDataUrl = await loadLogoDataUrl();
  let textStartX = marginX;
  if (logoDataUrl) {
    try {
      doc.addImage(logoDataUrl, "PNG", marginX, 16, 60, 60);
      textStartX = marginX + 76;
    } catch {
      // ignore image failures, fall back to text-only header
    }
  }

  doc.setTextColor(247, 244, 236);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Universidad Mariano Gálvez de Guatemala", textStartX, 38);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text(
    "Facultad de Ingeniería en Sistemas de Información y Ciencias de la Computación",
    textStartX,
    53
  );
  doc.text(
    "Seminario de Tecnologías de Información — Ing. M.S.C. Juan Posadas",
    textStartX,
    67
  );

  let y = 132;

  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.text("Constancia de finalización de cuestionario", marginX, y);

  y += 28;
  doc.setDrawColor(...gold);
  doc.setLineWidth(1);
  doc.line(marginX, y, pageWidth - marginX, y);

  y += 30;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11.5);
  doc.setTextColor(...ink);
  const dateStr = new Date()
    .toLocaleString("es-GT", {
      dateStyle: "long",
      timeStyle: "short",
    })
    .replace(/\.$/, "");

  const introLines = doc.splitTextToSize(
    `El estudiante "${student.name}" (carné ${student.carnet}) ha completado el cuestionario "${QUIZ_TITLE}" el ${dateStr}.`,
    pageWidth - marginX * 2
  );
  doc.text(introLines, marginX, y);
  y += introLines.length * 16 + 18;

  // Score summary box
  doc.setDrawColor(...ink);
  doc.setLineWidth(0.75);
  doc.roundedRect(marginX, y, pageWidth - marginX * 2, 62, 4, 4);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(...red);
  doc.text(`${correctCount}/${total}`, marginX + 18, y + 40);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(...grey);
  doc.text("Respuestas correctas", marginX + 18, y + 54);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(...ink);
  doc.text(`${percentage}%`, marginX + 170, y + 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(...grey);
  doc.text("Puntaje total", marginX + 170, y + 54);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(percentage >= 60 ? 47 : 179, percentage >= 60 ? 125 : 19, percentage >= 60 ? 79 : 34);
  const statusLabel = percentage >= 60 ? "APROBADO" : "NO APROBADO";
  doc.text(statusLabel, pageWidth - marginX - 20, y + 36, { align: "right" });

  y += 62 + 26;

  // Detail table
  const rows = questions.map((q, i) => {
    const ans = answers[i];
    const wasCorrect = ans && ans.selectedIndex === q.correctIndex;
    const selectedText =
      ans && ans.selectedIndex !== null && ans.selectedIndex !== undefined
        ? q.options[ans.selectedIndex]
        : "Sin responder";
    return [
      String(i + 1),
      q.prompt,
      selectedText,
      wasCorrect ? "Correcta" : "Incorrecta",
    ];
  });

  autoTable(doc, {
    startY: y,
    margin: { left: marginX, right: marginX },
    head: [["#", "Pregunta", "Respuesta del estudiante", "Resultado"]],
    body: rows,
    styles: {
      font: "helvetica",
      fontSize: 8.5,
      cellPadding: 6,
      textColor: ink,
      lineColor: [222, 218, 205],
      lineWidth: 0.5,
    },
    headStyles: {
      fillColor: ink,
      textColor: [247, 244, 236],
      fontStyle: "bold",
    },
    columnStyles: {
      0: { cellWidth: 26, halign: "center" },
      1: { cellWidth: 254 },
      2: { cellWidth: 150 },
      3: { cellWidth: 62 },
    },
    didParseCell: (data) => {
      if (data.section === "body" && data.column.index === 3) {
        const isCorrect = data.cell.raw === "Correcta";
        data.cell.styles.textColor = isCorrect ? [47, 125, 79] : [179, 19, 34];
        data.cell.styles.fontStyle = "bold";
      }
    },
  });

  const finalY = (doc as any).lastAutoTable.finalY || y;
  const footerY = Math.min(finalY + 40, doc.internal.pageSize.getHeight() - 40);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(...grey);
  doc.text(
    "Documento generado automáticamente por la aplicación del cuestionario. No requiere firma.",
    marginX,
    footerY
  );

  const fileSafeName = student.name.trim().replace(/\s+/g, "_");
  doc.save(`constancia_${fileSafeName}_${student.carnet}.pdf`);
}

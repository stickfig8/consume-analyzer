import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { useRef, useState } from "react";

export function useExportReport() {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  async function handleDownloadPDF() {
    if (!reportRef.current || isExporting) return;

    setIsExporting(true);

    await new Promise((r) => setTimeout(r, 100));

    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdfWidth = 110;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [pdfWidth, pdfHeight], // height를 동적으로
    });

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save("소비 분석 리포트.pdf");

    setIsExporting(false);
  }

  return {
    reportRef,
    handleDownloadPDF,
    isExporting,
  };
}

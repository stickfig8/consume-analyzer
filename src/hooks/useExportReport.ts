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

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210; // A4 width mm
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("소비 분석 리포트.pdf");

    setIsExporting(false);
  }

  return {
    reportRef,
    handleDownloadPDF,
    isExporting,
  };
}

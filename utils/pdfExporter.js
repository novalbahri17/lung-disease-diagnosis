// utils/pdfExporter.js - Utility untuk export PDF hasil diagnosis

import jsPDF from 'jspdf';

// Konfigurasi PDF
const PDF_CONFIG = {
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
  compress: true
};

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  if (!hex || hex.length !== 7) return [0, 0, 0];
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0];
}

export const generateDiagnosisPDF = async (result, imageData, validationResults) => {
  try {
    const pdf = new jsPDF(PDF_CONFIG);
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Header
    pdf.setFillColor(37, 99, 235); // Primary blue
    pdf.rect(0, 0, pageWidth, 30, 'F');
    
    // Logo dan Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Laporan Diagnosis AI Paru-paru', margin, 20);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('AI Medical Diagnosis System', margin, 26);

    yPosition = 45;

    // Patient Info Section
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Informasi Diagnosis', margin, yPosition);
    yPosition += 8;

    // Date and time
    const timestamp = new Date().toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Tanggal: ${timestamp}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`ID Diagnosis: DIAG-${Date.now()}`, margin, yPosition);
    yPosition += 15;

    // Main Diagnosis Result
    pdf.setFillColor(248, 250, 252);
    pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 25, 'F');
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(37, 99, 235);
    pdf.text('Hasil Diagnosis:', margin + 5, yPosition + 5);
    
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text(result.prediction, margin + 5, yPosition + 12);
    
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Tingkat Kepercayaan: ${Math.round(result.confidence * 100)}%`, margin + 5, yPosition + 18);
    
    yPosition += 35;

    // Confidence Scores Section
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('Skor Kepercayaan Semua Kondisi:', margin, yPosition);
    yPosition += 8;

    // Confidence bars
    if (result.confidence_scores) {
      Object.entries(result.confidence_scores).forEach(([disease, score]) => {
        const percentage = Math.round(score * 100);
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${disease}: ${percentage}%`, margin + 5, yPosition);
        
        // Progress bar
        const barWidth = 80;
        const barHeight = 3;
        const fillWidth = (percentage / 100) * barWidth;
        
        // Background bar
        pdf.setFillColor(230, 230, 230);
        pdf.rect(margin + 50, yPosition - 2, barWidth, barHeight, 'F');
        
        // Fill bar
        const isMainPrediction = disease === result.prediction;
        pdf.setFillColor(isMainPrediction ? 37 : 156, isMainPrediction ? 99 : 163, isMainPrediction ? 235 : 175);
        pdf.rect(margin + 50, yPosition - 2, fillWidth, barHeight, 'F');
        
        yPosition += 8;
      });
    }

    yPosition += 10;

    // Recommendations Section
    if (result.recommendations && result.recommendations.length > 0) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Rekomendasi:', margin, yPosition);
      yPosition += 8;

      result.recommendations.forEach((rec, index) => {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        
        // Wrap text for long recommendations
        const lines = pdf.splitTextToSize(`${index + 1}. ${rec}`, pageWidth - 2 * margin - 10);
        pdf.text(lines, margin + 5, yPosition);
        yPosition += lines.length * 5 + 3;
      });
    }

    yPosition += 10;

    // Technical Details
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Detail Teknis:', margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Waktu Pemrosesan: ${result.processing_time}ms`, margin + 5, yPosition);
    yPosition += 5;
    
    if (result.model_info) {
      pdf.text(`Model: ${result.model_info.name || 'EfficientNetB0'}`, margin + 5, yPosition);
      yPosition += 5;
      pdf.text(`Versi: ${result.model_info.version || '1.0.0'}`, margin + 5, yPosition);
      yPosition += 5;
    }

    // Validation Results
    if (validationResults) {
      yPosition += 10;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Validasi Gambar:', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Status: ${validationResults.isValid ? 'Valid' : 'Tidak Valid'}`, margin + 5, yPosition);
      yPosition += 5;

      if (validationResults.quality) {
        pdf.text(`Resolusi: ${validationResults.quality.width}×${validationResults.quality.height}`, margin + 5, yPosition);
        yPosition += 5;
        pdf.text(`Format: ${validationResults.quality.format}`, margin + 5, yPosition);
        yPosition += 5;
        pdf.text(`Ukuran: ${(validationResults.quality.size / 1024 / 1024).toFixed(2)} MB`, margin + 5, yPosition);
        yPosition += 5;
      }
    }

    // Add image if available
    if (imageData && yPosition < pageHeight - 80) {
      try {
        // Create a new page for the image if needed
        if (yPosition > pageHeight - 100) {
          pdf.addPage();
          yPosition = margin;
          
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Gambar X-ray:', margin, yPosition);
          yPosition += 10;
        } else {
          yPosition += 15;
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Gambar X-ray:', margin, yPosition);
          yPosition += 10;
        }

        // Add the image
        const imgWidth = 80;
        const imgHeight = 80;
        pdf.addImage(imageData, 'JPEG', margin + 10, yPosition, imgWidth, imgHeight);
        yPosition += imgHeight + 10;
      } catch (error) {
        console.warn('Could not add image to PDF:', error);
      }
    }

    // Footer
    const footerY = pageHeight - 15;
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Disclaimer: Hasil diagnosis ini hanya untuk referensi dan tidak menggantikan konsultasi medis profesional.', margin, footerY);
    pdf.text(`Generated by AI Lung Disease Diagnosis System - ${timestamp}`, margin, footerY + 5);

    // Save the PDF
    const fileName = `Diagnosis-${result.prediction}-${Date.now()}.pdf`;
    pdf.save(fileName);

    return { success: true, fileName };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return { success: false, error: error.message };
  }
};

export default generateDiagnosisPDF;

import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  /**
   * Génère un PDF à partir des données d'une facture
   * @param invoice Objet facture à convertir en PDF
   */
  generateInvoicePdf(invoice: Invoice): void {
    // Création d'un nouveau document PDF
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = margin;
    
    // Ajout de l'en-tête
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    doc.text('FACTURE', pageWidth / 2, yPos, { align: 'center' });
    
    // Numéro de facture
    yPos += 10;
    doc.setFontSize(16);
    doc.text(`Facture #${invoice.id}`, pageWidth / 2, yPos, { align: 'center' });
    
    // Date
    yPos += 10;
    doc.setFontSize(10);
    doc.text(`Date d'émission: ${this.formatDate(invoice.dateEmission)}`, pageWidth / 2, yPos, { align: 'center' });
    
    // Statut
    yPos += 15;
    doc.setFontSize(12);
    doc.text(`Statut: ${invoice.statut}`, margin, yPos);
    
    // Informations de la commande
    yPos += 10;
    doc.text(`Commande: #${invoice.commande.id}`, margin, yPos);
    yPos += 6;
    doc.text(`Fournisseur: ${invoice.commande.fournisseur}`, margin, yPos);
    
    // Montant
    yPos += 15;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Montant total: ${invoice.montant} €`, margin, yPos);
    doc.setFont('helvetica', 'normal');
    
    // Pied de page
    yPos = pageHeight - margin;
    doc.setFontSize(8);
    doc.text('ConstructionIQ Finance - Document généré automatiquement', pageWidth / 2, yPos, { align: 'center' });
    
    // Téléchargement du PDF
    doc.save(`facture_${invoice.id}.pdf`);
  }
  
  /**
   * Alternative: génère un PDF à partir d'un élément HTML
   * @param elementId ID de l'élément HTML à convertir en PDF
   * @param filename Nom du fichier PDF généré
   */
  generatePdfFromHtml(elementId: string, filename: string): void {
    // On récupère l'élément HTML
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found');
      return;
    }

    // Conversion de l'élément HTML en canvas
    html2canvas(element, {
      scale: 2, // Meilleure qualité
      useCORS: true, // Permet de charger des images externes
      logging: false
    }).then(canvas => {
      // Création du PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename);
    });
  }
  
  /**
   * Formate une date pour l'affichage
   * @param date Date à formater
   */
  private formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  }
}
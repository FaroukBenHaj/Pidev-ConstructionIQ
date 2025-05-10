import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Invoice } from '../models/invoice.model';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class InvoicePdfService {

  constructor() { }

  /**
   * Génère un PDF de facture avec un design professionnel
   */
  generateProfessionalInvoice(invoice: Invoice): void {
    if (!invoice) return;

    // Création d'un nouveau document PDF
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Couleurs
    const primaryColor = '#ffbc13';
    const secondaryColor = '#4b4b4b';
    
    // Ajout du logo et entête
    this.addHeader(doc, invoice, primaryColor, secondaryColor);
    
    // Ajout des informations de la facture
    this.addInvoiceInfo(doc, invoice, primaryColor, secondaryColor);
    
    // Ajout des détails de la commande
    this.addOrderDetails(doc, invoice, primaryColor, secondaryColor);
    
    // Ajout du tableau des articles (ici une ligne unique pour simplifier)
    this.addItemsTable(doc, invoice);
    
    // Ajout du récapitulatif des montants
    this.addTotals(doc, invoice, primaryColor);
    
    // Ajout du pied de page
    this.addFooter(doc, primaryColor, secondaryColor);
    
    // Sauvegarde du PDF
    doc.save(`facture_${invoice.id}.pdf`);
  }
  
  /**
   * Ajoute l'en-tête du document
   */
  private addHeader(doc: jsPDF, invoice: Invoice, primaryColor: string, secondaryColor: string): void {
    // Logo et nom de l'entreprise
    doc.setFillColor(primaryColor);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('ConstructionIQ', 20, 25);
    
    // Titre du document
    doc.setFontSize(18);
    doc.setTextColor(secondaryColor);
    doc.text('FACTURE', doc.internal.pageSize.getWidth() - 20, 25, { align: 'right' });
  }
  
  /**
   * Ajoute les informations de la facture
   */
  private addInvoiceInfo(doc: jsPDF, invoice: Invoice, primaryColor: string, secondaryColor: string): void {
    const startY = 50;
    
    // Informations de l'entreprise
    doc.setFontSize(10);
    doc.setTextColor(secondaryColor);
    doc.setFont('helvetica', 'normal');
    doc.text('ConstructionIQ S.A.', 20, startY);
    doc.text('1379 Shoreline Parkway', 20, startY + 5);
    doc.text('Mountain View, CA 94043', 20, startY + 10);
    doc.text('Tel: +1 718-999-3939', 20, startY + 15);
    doc.text('Email: contact@constructioniq.com', 20, startY + 20);
    
    // Informations du client (ici le fournisseur de la commande)
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('FOURNISSEUR:', doc.internal.pageSize.getWidth() - 90, startY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(invoice.commande.fournisseur, doc.internal.pageSize.getWidth() - 90, startY + 5);
    
    // Numéro de facture et date
    const boxStartY = startY + 30;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(20, boxStartY, 170, 25, 2, 2, 'F');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(secondaryColor);
    doc.text('Numéro de facture:', 25, boxStartY + 8);
    doc.text('Date d\'émission:', 25, boxStartY + 18);
    doc.text('Statut:', 100, boxStartY + 8);
    doc.text('Commande N°:', 100, boxStartY + 18);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`#${invoice.id}`, 75, boxStartY + 8);
    doc.text(this.formatDate(invoice.dateEmission), 75, boxStartY + 18);
    doc.text(`${invoice.statut}`, 135, boxStartY + 8);
    doc.text(`#${invoice.commande.id}`, 152, boxStartY + 18);
  }
  
  /**
   * Ajoute les détails de la commande
   */
  private addOrderDetails(doc: jsPDF, invoice: Invoice, primaryColor: string, secondaryColor: string): void {
    const startY = 115;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor);
    doc.text('DÉTAILS DE LA COMMANDE', 20, startY);
    
    doc.setLineWidth(0.5);
    doc.setDrawColor(primaryColor);
    doc.line(20, startY + 2, 190, startY + 2);
    
    doc.setTextColor(secondaryColor);
    doc.setFontSize(10);
    doc.text('Date de commande:', 20, startY + 10);
    doc.text('Matière:', 20, startY + 18);
    doc.text('Quantité:', 100, startY + 10);
    doc.text('Montant commande:', 100, startY + 18);
    
    doc.setFont('helvetica', 'normal');
    doc.text(this.formatDate(invoice.commande.dateCommande), 65, startY + 10);
    doc.text(`${invoice.commande.matiere}`, 65, startY + 18);
    doc.text(`${invoice.commande.quantiteDemandee}`, 135, startY + 10);
    doc.text(`${invoice.commande.montant} €`, 155, startY + 18);
  }
  
  /**
   * Ajoute le tableau des articles
   */
  private addItemsTable(doc: jsPDF, invoice: Invoice): void {
    const startY = 140;
    
    autoTable(doc, {
      startY: startY,
      head: [['Description', 'Quantité', 'Prix unitaire', 'Total']],
      body: [
        [`Commande #${invoice.commande.id} - ${invoice.commande.matiere}`, 
         '1', 
         `${invoice.montant} €`, 
         `${invoice.montant} €`]
      ],
      theme: 'grid',
      headStyles: {
        fillColor: [75, 75, 75],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { left: 20, right: 20 }
    });
  }
  
  /**
   * Ajoute le récapitulatif des montants
   */
  private addTotals(doc: jsPDF, invoice: Invoice, primaryColor: string): void {
    const finalY = (doc as any).lastAutoTable.finalY || 200;
    
    // Tableau des totaux
    autoTable(doc, {
      startY: finalY + 10,
      body: [
        ['Sous-total:', `${invoice.montant} €`],
        ['TVA (20%):', `${(parseFloat(invoice.montant.toString()) * 0.2).toFixed(2)} €`],
        ['TOTAL:', `${(parseFloat(invoice.montant.toString()) * 1.2).toFixed(2)} €`]
      ],
      theme: 'plain',
      styles: {
        cellPadding: 5
      },
      columnStyles: {
        0: { fontStyle: 'bold', halign: 'right' },
        1: { halign: 'right' }
      },
      margin: { left: 100, right: 20 },
      tableWidth: 'wrap'
    });
    
    // Conditions de paiement
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor);
    doc.text('CONDITIONS DE PAIEMENT', 20, (doc as any).lastAutoTable.finalY + 15);
    
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text('Paiement à effectuer dans les 30 jours suivant la réception de la facture.', 20, (doc as any).lastAutoTable.finalY + 22);
    doc.text('Merci pour votre confiance.', 20, (doc as any).lastAutoTable.finalY + 29);
  }
  
  /**
   * Ajoute le pied de page
   */
  private addFooter(doc: jsPDF, primaryColor: string, secondaryColor: string): void {
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Ligne de séparation
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(1);
    doc.line(20, pageHeight - 30, doc.internal.pageSize.getWidth() - 20, pageHeight - 30);
    
    // Texte du pied de page
    doc.setFontSize(8);
    doc.setTextColor(secondaryColor);
    doc.text('ConstructionIQ S.A. - SIRET: 123 456 789 00012 - APE: 4120B', doc.internal.pageSize.getWidth() / 2, pageHeight - 20, { align: 'center' });
    doc.text('Document généré automatiquement - Ne nécessite pas de signature', doc.internal.pageSize.getWidth() / 2, pageHeight - 15, { align: 'center' });
  }
  
  /**
   * Formate une date pour l'affichage
   */
  private formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  }
}
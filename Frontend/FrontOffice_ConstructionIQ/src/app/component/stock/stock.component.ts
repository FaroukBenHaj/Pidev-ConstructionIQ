import { Component, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Stock } from 'src/app/models/stock.model';
import { StockService } from 'src/app/service/stock.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  @ViewChild('dt1') dt1!: Table;

  stocks: Stock[] = [];
  loading: boolean = false;
  selectedMonth: Date | null = null; 
  totalCost: number | null = null;
  selectedStock: any = null;
  stockMaterials: any[] = [];
  stockCost: number | null = null;
  stockid: number | null = null;

  originalStocks: Stock[] = []; // Copie originale pour le filtrage
 

  constructor(private stockService: StockService, private router: Router) { }

  ngOnInit(): void {
    this.getAllStocks();
  }

  getAllStocks(): void {
    this.loading = true;
    this.stockService.getAllStocks().subscribe({
      next: (data) => {
        this.stocks = data;
        this.originalStocks = [...data]; // Sauvegarde la copie originale
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des stocks:', error);
        this.loading = false;
      }
    });
  }

  filterByMonth(): void {
    if (!this.selectedMonth) {
      this.stocks = [...this.originalStocks]; // Réinitialise si aucun mois sélectionné
      return;
    }

    const targetMonth = this.selectedMonth.getMonth() + 1; // +1 car les mois sont 0-indexés
    const targetYear = this.selectedMonth.getFullYear();

    this.stocks = this.originalStocks.filter(stock => {
      if (!stock.dateReceived) return false;
      
      // Gère les différents formats de date (MM/JJ/AA ou MM/JJ/AAAA)
      const dateParts = stock.dateReceived.split('/');
      if (dateParts.length < 3) return false;
      
      const month = parseInt(dateParts[0]);
      let year = parseInt(dateParts[2]);
      
      // Si l'année est sur 2 chiffres (ex: 25 pour 2025)
      if (year < 100) {
        year += 2000;
      }

      return month === targetMonth && year === targetYear;
    });
  }

  resetFilter(): void {
    this.selectedMonth = null;
    this.stocks = [...this.originalStocks];
  }

  loadTotalCost(stockId: number): void {
    this.stockService.getStockTotalCost(stockId).subscribe({
      next: (cost) => this.totalCost = cost,
      error: () => this.totalCost = null
    });
  }

  deleteStock(stockID: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce stock ?')) {
      this.stockService.deleteStock(stockID).subscribe(
        () => {
          this.stocks = this.stocks.filter(stock => stock.stockID !== stockID);
        },
        (error) => {
          console.error('Erreur lors de la suppression du stock:', error);
        }
      );
    }
  }

  editStock(stock: Stock): void {
    this.router.navigate(['/add-stock', stock.stockID]);
  }

  viewStockDetails(stock: any): void {
    this.selectedStock = stock;
    this.stockid = stock.stockID;
    this.stockMaterials = stock.materials;
  
    this.stockService.getStockTotalCost(stock.stockID).subscribe({
      next: (cost) => this.stockCost = cost,
      error: () => {
        this.stockCost = null;
        console.error('Erreur lors du calcul du coût total');
      }
    });
  }

  printDetails(): void {
    if (!this.selectedStock) return;
  
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = 'assets/img/logo-light@2x.png';
    
    doc.addImage(logo, 'PNG', 15, 10, 35, 15);
    doc.setFontSize(18);
    doc.setTextColor(30, 30, 30);
    doc.text('ConstructionIQ', 15, 28);
    doc.setFontSize(16);
    doc.text('Fiche de Stock', 105, 20, { align: 'center' });
    doc.setFontSize(11);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 10);

    const yStart = 45;
    doc.setFontSize(12);
    doc.text(`Stock ID: ${this.selectedStock.stockID}`, 10, yStart);
    doc.text(`Date de Réception: ${this.selectedStock.dateReceived}`, 10, yStart + 8);
    doc.text(`Projet ID: ${this.selectedStock.projetID}`, 10, yStart + 16);
    doc.text(`Quantité Totale: ${this.selectedStock.availableQuantity}`, 10, yStart + 24);

    const tableY = yStart + 35;
    autoTable(doc, {
      startY: tableY,
      head: [['Nom du Matériau', 'Quantité Sélectionnée', 'Coût Unitaire (€)', 'Total (€)']],
      body: this.stockMaterials.map(material => [
        material.materialName,
        material.selectedQuantity,
        material.cost.toFixed(2),
        (material.cost * material.selectedQuantity).toFixed(2)
      ]),
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(13);
    doc.text(`Coût total du stock : ${this.stockCost?.toFixed(2)} €`, 15, finalY);

    doc.save(`Fiche_Stock_${this.selectedStock.stockID}.pdf`);
  }
}
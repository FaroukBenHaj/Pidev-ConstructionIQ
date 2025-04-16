import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Stock } from 'src/app/models/stock.model';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  stocks: Stock[] = [];  // Tableau pour stocker la liste des stocks
  loading: boolean = false;  // Variable pour gérer l'état de chargement
  searchName: string = '';  // Variable pour la recherche globale
  totalCost: number | null = null;
  selectedStock: any = null;
  stockMaterials: any[] = [];
  stockCost: number | null = null;
  stockid: number | null = null;



  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getAllStocks();  // Appeler la méthode pour récupérer les stocks lors de l'initialisation
  }

  // Méthode pour récupérer tous les stocks
  getAllStocks(): void {
    this.loading = true;  // Démarrer le chargement
    this.stockService.getAllStocks().subscribe(
      (data) => {
        this.stocks = data;  // Assigner les données reçues à la variable stocks
        this.loading = false;  // Arrêter le chargement
      },
      (error) => {
        console.error('Erreur lors de la récupération des stocks:', error);  // Gérer les erreurs si nécessaire
        this.loading = false;  // Arrêter le chargement même en cas d'erreur
      }
    );
  }
  loadTotalCost(stockId: number): void {
    this.stockService.getStockTotalCost(stockId).subscribe({
      next: (cost) => this.totalCost = cost,
      error: () => this.totalCost = null
    });
  }
  

  // Méthode pour supprimer un stock
  deleteStock(stockID: number): void {
    // Logic to delete stock by ID
    this.stockService.deleteStock(stockID).subscribe(
      () => {
        // Suppression réussie, on retire le stock de la liste
        this.stocks = this.stocks.filter(stock => stock.stockID !== stockID);
      },
      (error) => {
        console.error('Erreur lors de la suppression du stock:', error);
      }
    );
  }

  // Méthode pour modifier un stock
  editStock(stock: Stock): void {
    // Logic to edit stock, such as navigating to a stock edit page
    console.log('Editing stock:', stock);
    // Example: Navigate to edit page with stock data, 
    // this.router.navigate(['/edit-stock', stock.stockID]);
  }

  // Méthode pour la recherche globale
  onGlobalFilter(dt: any, event: any): void {
    dt.filterGlobal(event.target.value, 'contains');
  }
  viewStockDetails(stock: any): void {
    this.selectedStock = stock;
    this.stockid = stock.stockID;
    // Charger les matériaux (depuis stock.materials déjà inclus)
    this.stockMaterials = stock.materials;
  
    // Charger le coût depuis le backend
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
  
    // Ajouter un logo
    const logo = new Image();
    logo.src = 'assets/img/logo-light@2x.png';
  // 👉 Logo en haut à gauche
    doc.addImage(logo, 'PNG', 15, 10, 35, 15); // X = 15, Y = 10

// 👉 Nom du projet juste en dessous du logo (gauche, pas centré)
    doc.setFontSize(18);
    doc.setTextColor(30, 30, 30);

// Position du texte : même X, Y = bas du logo + marge
    doc.text('ConstructionIQ', 15, 28); // 10 (logo Y) + 15 (logo height) + ~3px marge

  
      // Titre du document
      doc.setFontSize(16);
      doc.text('Fiche de Stock', 105, 20, { align: 'center' });
  
      doc.setFontSize(11);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 10);
  
      // Infos générales du stock
      const yStart = 45;
      doc.setFontSize(12);
      doc.text(`Stock ID: ${this.selectedStock.stockID}`, 10, yStart);
      doc.text(`Date de Réception: ${this.selectedStock.dateReceived}`, 10, yStart + 8);
      doc.text(`Projet ID: ${this.selectedStock.projetID}`, 10, yStart + 16);
      doc.text(`Quantité Totale: ${this.selectedStock.availableQuantity}`, 10, yStart + 24);
  
      // Tableau des matériaux
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
  
      // Coût total
      const finalY = (doc as any).lastAutoTable.finalY + 10;
      doc.setFontSize(13);
      doc.text(`Coût total du stock : ${this.stockCost?.toFixed(2)} €`, 15, finalY);
  
      // Sauvegarde du PDF
      doc.save(`Fiche_Stock_${this.selectedStock.stockID}.pdf`);
    };
  }
  
  


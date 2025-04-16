import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart-material',
  templateUrl: './chart-material.component.html',
  styleUrls: ['./chart-material.component.css']
})
export class ChartMaterialComponent implements OnChanges {
  @Input() materials: any[] = [];
  @ViewChild('barCanvas', { static: true }) barCanvas!: ElementRef;

  chart: Chart | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['materials'] && this.materials.length > 0) {
      this.renderChart();
    }
  }

  renderChart(): void {
    if (this.chart) {
      this.chart.destroy(); // Nettoie l'ancien graphique
    }

    this.chart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.materials.map(m => m.materialName),
        datasets: [
          {
            label: 'Coût (€)',
            data: this.materials.map(m => m.cost),
            backgroundColor: '#42A5F5'
          },
          {
            label: 'Quantité sélectionnée',
            data: this.materials.map(m => m.selectedQuantity || 0),
            backgroundColor: '#FFA726'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Coût et Quantité des Matériaux'
          },
          legend: {
            position: 'top'
          }
        }
      }
    });
  }
}

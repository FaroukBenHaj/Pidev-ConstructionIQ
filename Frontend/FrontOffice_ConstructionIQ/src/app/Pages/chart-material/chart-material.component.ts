import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { Material } from '../../material.model';

@Component({
  selector: 'app-chart-material',
  templateUrl: './chart-material.component.html',
  styleUrls: ['./chart-material.component.css']
})
export class ChartMaterialComponent implements OnChanges {
  @Input() materials: Material[] = [];
  @ViewChild('barCanvas') barCanvas!: ElementRef;
  chart: Chart | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['materials']) {
      this.renderChart();
    }
  }

  renderChart(): void {
    // Détruire le graphique existant
    if (this.chart) {
      this.chart.destroy();
    }

    // Ne pas créer de graphique si aucun matériau
    if (!this.materials || this.materials.length === 0) {
      return;
    }

    this.chart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: this.getChartData(),
      options: this.getChartOptions()
    });
  }

  private getChartData(): any {
    return {
      labels: this.materials.map(m => m.materialName),
      datasets: [
        {
          label: 'Coût (€)',
          data: this.materials.map(m => m.cost),
          backgroundColor: '#4361ee',
          borderColor: '#3a56d4',
          borderWidth: 1
        },
        {
          label: 'Quantité disponible',
          data: this.materials.map(m => m.selectedQuantity || 0),
          backgroundColor: '#4cc9f0',
          borderColor: '#3ab7d9',
          borderWidth: 1
        }
      ]
    };
  }

  private getChartOptions(): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Statistiques des Matériaux',
          font: {
            size: 16
          }
        },
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Valeur'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Matériaux'
          }
        }
      }
    };
  }
}

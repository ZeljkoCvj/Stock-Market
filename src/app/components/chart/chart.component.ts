import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  private updateInterval: any;
  private chart!: Chart;

  data = {
    labels: ['1900', '1950', '1999', '2050'],
    datasets: [
      {
        label: 'Europe',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        data: [408, 547, 675, 734],
      },
      {
        label: 'Africa',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        data: [133, 221, 783, 2478],
      },
      {
        label: 'America',
        backgroundColor: 'rgb(255, 187, 71)',
        data: [135, 261, 773, 2778],
      },
      {
        label: 'Asia',
        backgroundColor: 'rgb(128, 0, 188)',
        data: [115, 333, 763, 2378],
      },
    ],
  };

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.createChart();
    this.updateChartLabels();

    this.updateInterval = setInterval(() => {
      this.updateData();
    }, 5000);

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateChartLabels();
      this.updateData();
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.updateInterval);
  }

  createChart(): void {
    const translatedLabels = this.data.labels.map((label) => {
      return this.translate.instant(label);
    });

    this.chart = new Chart('barChart', {
      type: 'line',
      data: {
        labels: translatedLabels,
        datasets: this.data.datasets,
      },
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: this.translate.instant('Dynamic Bar Chart'),
          },
        },
      },
    });
  }

  updateData(): void {
    // Ažuriranje podataka grafikona
  }

  updateChartLabels(): void {
    this.data.datasets.forEach((dataset) => {
      dataset.label = this.translate.instant(dataset.label);
    });

    this.chart.data.datasets = this.data.datasets;
    this.chart.update();
  }

  generateRandomData(): number[] {
    return [
      Math.floor(Math.random() * 2000),
      Math.floor(Math.random() * 2000),
      Math.floor(Math.random() * 2000),
      Math.floor(Math.random() * 2000),
    ];
  }
}

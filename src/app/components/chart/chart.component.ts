import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  private updateInterval: any;
  private chart!: Chart;
  constructor(private translate: TranslateService) {}
  data = {
    labels: ['1900', '1950', '1999', '2050'],
    datasets: [
      {
        label: 'Europe ',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        data: [408, 547, 675, 734],
      },
      {
        label: 'Africa ',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        data: [133, 221, 783, 2478],
      },
      {
        label: 'America ',
        backgroundColor: 'rgb(255, 187, 71)',
        data: [135, 261, 773, 2778],
      },
      {
        label: 'Asia ',
        backgroundColor: 'rgb(128, 0, 188)',
        data: [115, 333, 763, 2378],
      },
    ],
  };

  ngOnInit(): void {
    this.createChart();

    this.updateInterval = setInterval(() => {
      this.updateData();
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.updateInterval);
  }

  createChart(): void {
    const translatedLabels = this.data.datasets.map((dataset) => {
      const translatedLabel = this.translate.instant(dataset.label);

      return {
        ...dataset,
        label: this.translate.instant(dataset.label),
      };
    });

    this.chart = new Chart('barChart', {
      type: 'line',
      data: {
        ...this.data,
        datasets: translatedLabels,
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
            text: 'Dynamic Bar Chart',
          },
        },
      },
    });
  }

  updateData(): void {
    const newData = {
      labels: ['1900', '1950', '1999', '2050'],
      datasets: [
        {
          label: 'Europe',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          data: this.generateRandomData(),
        },
        {
          label: 'Africa',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          data: this.generateRandomData(),
        },
        {
          label: 'America',
          backgroundColor: 'rgb(255, 187, 71)',
          data: this.generateRandomData(),
        },
        {
          label: 'Asia',
          backgroundColor: 'rgb(128, 0, 188)',
          data: this.generateRandomData(),
        },
      ],
    };

    this.chart.data = newData;
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

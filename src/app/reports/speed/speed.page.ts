import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as HighCharts from 'highcharts';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-speed',
  templateUrl: './speed.page.html',
  styleUrls: ['./speed.page.scss'],
})
export class SpeedPage implements OnInit {

  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;

  constructor() {}

  ngOnInit() {
    let Width = window.screen.width;
    localStorage.setItem("s_width", Width.toString());
    let Height = window.screen.height;
    localStorage.setItem("s_height", Height.toString());
    let width = window.innerWidth;
    localStorage.setItem("w_width", width.toString());
    let height = window.innerHeight;
    localStorage.setItem("w_height", height.toString());
    this.barChart = new Chart('container', {
      type: "bar",
      data: {
        labels: ["Screen_Width", "Screen_Height", "Window_Width", "Window_Height"],
        datasets: [
          {
            label: "Size",
            data: [localStorage.getItem("s_width"), localStorage.getItem("s_height"), localStorage.getItem("w_width"), localStorage.getItem("w_height")],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    this.doughnutChart = new Chart('doughnutCanvas', {
      type: "doughnut",
      data: {
        labels: ["Screen_Width", "Screen_Height", "Window_Width", "Window_Height"],
        datasets: [
          {
            label: "Size",
            data:  [localStorage.getItem("s_width"), localStorage.getItem("s_height"), localStorage.getItem("w_width"), localStorage.getItem("w_height")],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
      }
    });

    this.lineChart = new Chart('lineCanvas', {
      type: "line",
      data: {
        labels: ["Screen_Width", "Screen_Height", "Window_Width", "Window_Height"],
        datasets: [
          {
            label: "Size dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data:  [localStorage.getItem("s_width"), localStorage.getItem("s_height"), localStorage.getItem("w_width"), localStorage.getItem("w_height")],
            spanGaps: false
          }
        ]
      }
    });
  }
}

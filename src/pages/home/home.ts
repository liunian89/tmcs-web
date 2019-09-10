import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {DataPointsService} from "../../app/data.service";
import {DataPoint} from "../../app/dataPoint";
import * as d3 from "d3";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  private dataPoints: DataPoint[];
  private errorMessage: string;
  private code: string = '';
  private temp: number = 0;

  private state: boolean = false;

  constructor(public navCtrl: NavController, private dataPointsService: DataPointsService) {

  }

  ngOnInit(): void {
    this.freshAll();

    let data = [{slot: 1, temp: 50}, {slot: 2, temp: 150}, {slot: 3, temp: 100}];

    let container = document.getElementById("canvas");
    let svg = d3.select(container).append("svg");
    let margin = {top: 5, right: 5, bottom: 5, left: 5};

    let width = container.clientWidth;
    let height = container.clientHeight;

    console.log('width = ' + width);
    console.log('height = ' + height);

    svg.attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .style("background-color", "white");

    let xScale = d3.scaleLinear()
      .range([0, width])
      .domain(d3.extent(data, function (d) {
        return d.slot
      }));

    let yScale = d3.scaleLinear()
      .range([0, height])
      .domain([0, d3.max(data, function (d) {
        return d.temp;
      })]);

    let line = d3.line()
        .x(function(d) {return xScale(d.slot);})
        .y(function(d) {
          console.log(yScale(d.temp));
          return yScale(d.temp);});


    svg.append("path")
      .data([data])
      .attr("d", line)
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("fill", "none")
    ;

    svg.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("x", function(d) {return d.slot})
      .attr("y", function(d) {return d.temp})
      .attr("width", 20)
      .attr("height", function(d){return yScale(d.temp);})
    ;
  }

  freshAll(): void {
    this.dataPointsService.getDataPoints()
      .subscribe(
        data => {
          this.dataPoints = data;
          this.code = data[0].code;
          this.temp = data[0].temperature;
          console.log(this.dataPoints);
        },
        error => {
          this.errorMessage = <any>error;
          console.error('oops' + this.errorMessage);
        },
        () => {
          console.log('End of lifecycle')
        })
  }


  onClick(): void {
    if (this.state) {
      d3.select("ion-content").transition().style("background-color", "blue");
    } else {
      d3.select("ion-content").transition()
        .delay(750)
        .styleTween("background-color", function () {
          return d3.interpolate("green", "red");
        })
        .duration(5000)
      ;
    }
    this.state = !this.state;
    // this.freshAll();
    this.temp = 0;
    this._increaseProgress(() => this.temp = 999);
  }

  _increaseProgress(doneCallback: () => void) {
    this.temp += 1;
    console.log(`Current progress: ${this.temp}%`);

    if (this.temp < 100) {
      window.setTimeout(() => {
        this._increaseProgress(doneCallback);
      }, 10);
    } else {
      doneCallback();
    }
  }

}

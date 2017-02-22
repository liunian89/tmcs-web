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

  constructor(public navCtrl: NavController, private dataPointsService: DataPointsService) {

  }

  ngOnInit(): void {
    this.freshAll();
    d3.selectAll("p").style("color", "blue");
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

import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {DataPointsService} from "../../app/data.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private dpService: DataPointsService) {

  }

  onClick(): void {
    this.dpService.getAll();
    console.log(this.dpService.getDataPoints());
  }

}

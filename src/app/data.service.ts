import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {DataPoint} from "./dataPoint";
import "rxjs/add/operator/toPromise";
import {HTTP} from 'ionic-native';

@Injectable()
export class DataPointsService {
  // private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'http://192.168.2.5:8080/datapoints';

  constructor(private http: Http) {
  }

  getDataPoints(): Promise<DataPoint[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as DataPoint[])
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  public getAll(): void {

    HTTP.get(this.url, {}, {})
      .then(data => {
        console.log('raw');
        console.log(data);
        console.log('satus');
        console.log(data.status);
        console.log('data');
        console.log(data.data); // data received by server
        console.log('headers');
        console.log(data.headers);

      })
      .catch(error => {

        console.error(error.status);
        console.error(error.error); // error message as string
        console.error(error.headers);

      });
  }
}

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  feedData$ = new BehaviorSubject<any>([]);
  constructor(private httpService: HttpService) { }

  changeFeedData(data: any){
    this.feedData$.next(data);
  }

  getFeedsData(postData: any): Observable<any>{
    return this.httpService.get('servicios', postData);
  }

  feedData(postData: any): Observable<any>{
    return this.httpService.post('servicio', postData);
  }
}

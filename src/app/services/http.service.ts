import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(serviceName: string, data: any){
    const headers = new HttpHeaders();
    const options = { header: headers, withCredentials: false };

    const url = environment.apiUrl + serviceName;

    return this.http.post(url, data, options);
  }

  get(serviceName: string, data: any, params: any = [], headers: any = []){
    const token = window.localStorage.getItem("token");
    let paramHeaders =  new HttpHeaders().set('Content-Type', 'application/json');
    paramHeaders = paramHeaders.append('Authorization', 'Bearer ' + data);    
    let paramQuery = new HttpParams();
    headers.forEach(item => {
      paramHeaders = paramHeaders.append(item.campo, item.valor);
    });
    if (params === null) {
      params = [];
    }
    params.forEach(item => {
      paramQuery = paramQuery.append(item.campo, item.valor);
    });
    const url = environment.apiUrl + serviceName;

    return this.http.get(url, { headers: paramHeaders, params: paramQuery });
  }
}

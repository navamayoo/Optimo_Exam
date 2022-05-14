import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getItem(){
    return this.http.get<any>("http://145.239.206.89/Interview/api/test/items/?fields=id,name,description,ItemCategory,DefaultPriceConcessionID,DefaultPriceConcessionName,active");
  }

  getItemPrice(){
    return this.http.get<any>("http://145.239.206.89/Interview/api/test/items/11260?include=itempricegroups,pricegroups&priceconcessionid=4");
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs";
import {FbResponse, IProduct} from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  create(product) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
      .pipe(map((res: FbResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      }))
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
      .pipe( map ( res => {
        return Object.keys(res)
          .map( key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }))
      }))
  }

  getById(id) {
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe( map ( (res: IProduct) => {
        return {
          ...res,
          id,
          date: new Date(res.date)
        }
      }))
  }

  remove(id) {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`)
  }

  update(product: IProduct) {
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`,product)
  }
}

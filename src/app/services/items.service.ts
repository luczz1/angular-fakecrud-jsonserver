import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DadosModel } from '../cadastro/dadosform.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  headers = new HttpHeaders
  url: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { 
    this.headers.append('Content-type', 'application/json')
  }

  infosDoForm(dadosDoForm: any) : Observable<any> {
    return this.http.post(
      `${this.url}/items`,
      dadosDoForm,
      ({headers: this.headers})
    )
  }

  getInfos() : Observable<any> {
    return this.http.get(
      `${this.url}/items`
    )
  }

  deleteInfo(itemID: any): Observable<any> {
    return this.http.delete(
      `${this.url}/items/${itemID}`
      )
  }

  searchInfo(searchValue: string) : Observable<any> {
    return this.http.get(
      `${this.url}/items?name_like=${searchValue}`
    )
  }

  detailsItem(item: any) : Observable<any> {
    return this.http.get(
      `${this.url}/items?name=${item}`
    )
  }

  editItem(itemID: any, itemAlterado: DadosModel) : Observable<any> {
    return this.http.put(
      `${this.url}/items/${itemID}`,
      itemAlterado
    )
  }
  
}

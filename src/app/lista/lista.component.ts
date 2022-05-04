import { Location } from '@angular/common';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { DadosModel } from '../cadastro/dadosform.model';
import { ItemsService } from '../services/items.service';
import { EditarItemComponent } from './editar-item/editar-item.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ListaComponent implements OnInit {

  listaItems: DadosModel[] = []
  itemID: number

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.getItemsFunction()
  }

  deleteInfo(name: string) : void {
    let confirmdelete = confirm(`Deseja excluir ${name}?`)
    if(confirmdelete) {
      this.itemsService.detailsItem(name).subscribe(itemID => {
        this.itemID = itemID[0].id
        this.itemsService.deleteInfo(this.itemID).subscribe()
        this.getItemsFunction()
      })
    }
   
  }

  pesquisaNome(valorPesquisa: string) : void {
    this.itemsService.searchInfo(valorPesquisa).subscribe(retornoPesquisa => {
      this.listaItems = retornoPesquisa
    })
  }

  getItemsFunction() {
    this.listaItems = []
    this.itemsService.getInfos().subscribe((dados: any) => {
      dados.forEach((item: any) => {
        this.listaItems.push(item)
      });
    })
  }

}

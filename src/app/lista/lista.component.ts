import { Component, Injectable, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DadosModel } from '../cadastro/dadosform.model';
import { ItemsService } from '../services/items.service';

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
  occult: boolean = false
  @ViewChild('modalCadastro')
  modalCadastro: TemplateRef<any>


  constructor(private itemsService: ItemsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getItemsFunction()
  }

  deleteInfo(name: string) : void {
    
    let confirmdelete = confirm(`Deseja excluir ${name}?`)
    if(confirmdelete) {
      console.log(this.itemID)
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

  updateList(event?: any) {
    this.listaItems = []
    this.getItemsFunction()
    this.modalService.dismissAll()
  }

  abrirModal() {
    this.modalService.open(this.modalCadastro)
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

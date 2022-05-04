import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ItemsService } from '../services/items.service';
import { DadosModel } from './dadosform.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm = new FormGroup({
    "name": new FormControl(null),
    "description": new FormControl(null),
    "additionalInfos": new FormControl(null)
  })

  formList: DadosModel[] = []
  itemName: string
  @Output() successfullyRegistered = new EventEmitter<any>()

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
  }

  enviarForm(): void {
    if (this.cadastroForm.valid) {
      let dadosForm = new DadosModel(
        this.cadastroForm.get('name').value.trim(),
        this.cadastroForm.get('description').value.trim(),
        this.cadastroForm.get('additionalInfos').value.trim()
      )
      this.itemsService.infosDoForm(dadosForm).subscribe((dadosRecebidos: any) => {
        this.formList = dadosRecebidos
        this.itemName = dadosRecebidos.name
        this.cadastroForm.reset()
        this.successfullyRegistered.emit(true)
      })
      
    } else {
      this.cadastroForm.get('name').markAsDirty()
      this.cadastroForm.get('description').markAsDirty()
    }
   
  }

}

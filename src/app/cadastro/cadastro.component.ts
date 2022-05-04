import { Component, OnInit } from '@angular/core';
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
  enviado: boolean = false
  itemName: string

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
  }

  enviarForm(): void {
    if (this.cadastroForm.valid) {
      let dadosForm = new DadosModel(
        this.cadastroForm.get('name').value,
        this.cadastroForm.get('description').value,
        this.cadastroForm.get('additionalInfos').value
      )
      this.itemsService.infosDoForm(dadosForm).subscribe((dadosRecebidos: any) => {
        this.formList = dadosRecebidos
        this.itemName = dadosRecebidos.name
        this.enviado = true
        this.cadastroForm.reset()
      })
      
    } else {
      this.cadastroForm.get('name').markAsDirty()
      this.cadastroForm.get('description').markAsDirty()
    }
   
  }

}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { ItemDetail } from '../detalhes-item/item-detail.model';

@Component({
  selector: 'app-editar-item',
  templateUrl: './editar-item.component.html',
  styleUrls: ['./editar-item.component.css']
})

export class EditarItemComponent implements OnInit {

  editForm: FormGroup = new FormGroup({
    "name": new FormControl(),
    "description": new FormControl(),
    "additionalInfos": new FormControl(),
  })

  itemEditDetail: ItemDetail[] = [{
    name: this.editForm.get('name').value,
    description: this.editForm.get('description').value,
    additionalInfos: this.editForm.get('additionalInfos').value
  }]

  editedDetails: ItemDetail[] = []
  routeName: string;
  itemID: number
  saveMsg: string = 'Você tem alterações não salvas.'

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((routeParam: any) => {
      this.itemsService.detailsItem(routeParam.name).subscribe(resDetail => {
        this.editForm.setValue({
          name: resDetail[0].name,
          description: resDetail[0].description,
          additionalInfos: resDetail[0].additionalInfos,
        })
        this.routeName = resDetail[0].name
      })
    })

  }

  saveEdit(): void {
    if(this.editForm.valid) {
      this.itemEditDetail = [{
        name: this.editForm.get('name').value,
        description: this.editForm.get('description').value,
        additionalInfos: this.editForm.get('additionalInfos').value
      }]
      this.itemsService.detailsItem(this.routeName).subscribe(itemID => {
        this.itemID = itemID[0].id
        this.itemsService.editItem(this.itemID, this.itemEditDetail[0]).subscribe()
      })
      this.routeName = this.editForm.get('name').value
      if (this.saveMsg == '') {
        this.saveMsg = 'As alterações já foram salvas.'
        setTimeout(() => {
          this.saveMsg = ''
        }, 1500)
      } else {
        this.saveMsg = 'Salvo!'
        setTimeout(() => {
          this.saveMsg = ''
        }, 1500)
      }
    } else {
      this.editForm.get('name').markAsDirty()
      this.editForm.get('description').markAsDirty()
    }
  }

  
  deleteInfo() : void {
    let confirmdelete = confirm(`Deseja excluir ${this.routeName}?`)
    if(confirmdelete) {
      this.itemsService.detailsItem(this.routeName).subscribe(itemID => {
        this.itemID = itemID[0].id
        this.itemsService.deleteInfo(this.itemID).subscribe()
        this.location.back()
      })
    }
  }

  saveAlt() {
    this.saveMsg = 'Você tem alterações não salvas.'
  }

}

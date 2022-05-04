import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { ItemDetail } from './item-detail.model';

@Component({
  selector: 'app-detalhes-item',
  templateUrl: './detalhes-item.component.html',
  styleUrls: ['./detalhes-item.component.css']
})
export class DetalhesItemComponent implements OnInit {

  itemDetail: ItemDetail[] = []

  constructor(private route: ActivatedRoute, private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((routeParam: any) => {
      this.itemsService.detailsItem(routeParam.name).subscribe(resDetail => {
        this.itemDetail = [{
          name: resDetail[0].name,
          description: resDetail[0].description,
          additionalInfos: resDetail[0].additionalInfos,
        }]
      })
    })
  }

}

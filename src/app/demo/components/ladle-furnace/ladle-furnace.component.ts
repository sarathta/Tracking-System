import { Component, OnInit } from '@angular/core';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-ladle-furnace',
  templateUrl: './ladle-furnace.component.html',
  styleUrls: ['./ladle-furnace.component.scss']
})
export class LadleFurnaceComponent implements OnInit {
  // products!: Product[];

  // constructor(private productService: ProductService) {}
  // data:any[]=[
  //   { Status: 'Lf ongoing', 
  //     Position: 1 , 
  //     HeatNo: 261565, 
  //     BOFFinishTime:"07:10:2024 ",
  //     ArrivalTime:"07:15:2024 ",
  //     Grade:'second',
  //     LadleNo:30,
  //     InitialTemp:16313,
  //     TargetTemp:1593,
  //     SteelWeight:123.1,
  //     LadleWeight:70.7,
  //     SlagHeight:100,
  //     InitialO2:2
  //   },
  //     { Status: 'Lf ongoing', 
  //       Position: 3 , 
  //       HeatNo: 261563, 
  //       BOFFinishTime:"09:15:2024 ",
  //       ArrivalTime:"09:20:2024 ",
  //       Grade:'thrid',
  //       LadleNo:40,
  //       InitialTemp:12313,
  //       TargetTemp:1573,
  //       SteelWeight:123.1,
  //       LadleWeight:80.7,
  //       SlagHeight:100,
  //       InitialO2:5
  //     },
  //     { Status: 'Lf outgoing', 
  //       Position: 1 , 
  //       HeatNo: 261565, 
  //       BOFFinishTime:"08:10:2024 ",
  //       ArrivalTime:"08:15:2024 ",
  //       Grade:'fourth',
  //       LadleNo:30,
  //       InitialTemp:16313,
  //       TargetTemp:1593,
  //       SteelWeight:123.1,
  //       LadleWeight:70.7,
  //       SlagHeight:100,
  //       InitialO2:3}
  // ]

  // ngOnInit() {
  //     this.productService.getProducts().then((data) => {
  //         this.products = this.data;
  //     });
  // }
  selectedData: any;
  loading: boolean =false;
  ngOnInit(): void {
    
  }


}

  


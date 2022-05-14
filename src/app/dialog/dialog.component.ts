import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<any>;
  _data : any;
  _weekend: any;
  _weekday: any;

  constructor( private api: ApiService) {}

  ngOnInit(): void {
   this.getItemPriceDetails();
  }

  getItemPriceDetails(){
    this.api.getItemPrice().subscribe({
      next:(res)=>{
        console.log(res.Data);
        this.dataSource = new MatTableDataSource(res.Data);
        this.obs = this.dataSource.connect();
        this._data = res.Data.Name;
        this._weekend = res.Data.ItemPriceGroups[0].PriceGroups.Name;
       console.log("_data", this._data);
       console.log("this._weekend", this._weekend);

      }
    })
  }



}

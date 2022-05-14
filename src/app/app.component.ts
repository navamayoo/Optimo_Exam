import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './services/api.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AngularApp';

  displayedColumns: string[] = [
    'Id',
    '',
    'Name',
    'ItemCategory',
    'DefaultPriceConcessionName',
  ];
  // dataSource!: MatTableDataSource<any>;

  obs!: Observable<any>;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems() {
    this.api.getItem().subscribe({
      next: (res) => {
        console.log(res.Data);
        this.dataSource = new MatTableDataSource(res.Data);
        this.obs = this.dataSource.connect();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('test', this.dataSource);
      },
      error: (err) => {
        alert('Error while fetching the records');
      },
    });
  }

  priceDetailsDialog() {
    this.dialog.open(DialogComponent, {
      width: '70%',
      // data: data = this.getItemPriceDetails()
    });
  }

  // priceDetailsDialog(){
  //   const dialogRef = this.dialog
  //   .open(DialogComponent, {
  //     width: '50%',
  //   })
  //   .afterClosed()
  //   .subscribe((val) => {
  //     if (val === 'close') {
  //       this.getAllItems();
  //     }
  //   });

  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

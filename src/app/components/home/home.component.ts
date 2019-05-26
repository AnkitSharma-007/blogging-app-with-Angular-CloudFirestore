import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  config: any;
  pageSizeOptions = [];

  constructor() {
    this.pageSizeOptions = [2, 4, 6];

    this.config = {
      currentPage: 1,
      itemsPerPage: this.pageSizeOptions[0]
    };
  }

  ngOnInit() {
  }

}

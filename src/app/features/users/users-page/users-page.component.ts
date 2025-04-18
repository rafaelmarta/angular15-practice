import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  users = []
  filterText = '';
  companyOptions = [];
  languageOptions = [];
  currentPage = 1;
  pageSize = 10;

  constructor() {
    console.log('test')
  }

  ngOnInit(): void {
    console.log('iniciou')
  }
} 

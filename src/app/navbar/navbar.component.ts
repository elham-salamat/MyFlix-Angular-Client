import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: any = localStorage.getItem('user');

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  openHomepage(): void {
    this.router.navigate(['movies']);
  }

  openProfilePage(): void {
    this.router.navigate(['profile']);
  }

  userLogout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

}

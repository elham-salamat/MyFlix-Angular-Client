import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

/**
 * This class creates navbar for the app
 */
export class NavbarComponent implements OnInit {
  username: any = localStorage.getItem('user');

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }


  /**
   * navigates to homepage, displaying a list of movies
   */
  openHomepage(): void {
    this.router.navigate(['movies']);
  }

  /**
   * navigates to user profile
   */
  openProfilePage(): void {
    this.router.navigate(['profile']);
  }

  /**
   * logs out users, clears local storage and navigates to welcome page
   */
  userLogout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

}

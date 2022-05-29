import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { DirectorComponent } from '../director/director.component'
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  userFavorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  openDirectorDialog(name: string, bio: string, birthyear: number, deathyear: number): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        BirthYear: birthyear,
        DeathYear: deathyear
      }
    });

  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description
      }
    });

  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description
      }
    });
  }

  getUser(): void {
    this.fetchApiData.getUserInfo().subscribe((response: any) => {
      console.log(response);
      this.userFavorites = response.FavoriteMovies;
      console.log('userFavs is :' + this.userFavorites);
    });
  }

  addToFavorites(id: string): void {
    this.fetchApiData.addToFavorite(id).subscribe((response) => {
      this.ngOnInit();
    });
  }

  removeFromFavorites(id: string): void {
    this.fetchApiData.removeFromFavorite(id).subscribe((response) => {
      this.ngOnInit();
    })
  }

  isFavorite(id: string): boolean {
    return this.userFavorites.includes(id);
  }

}

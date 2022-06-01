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

/**
 * This class creates a list of movies, displaying to the user as soon as she/he login
 */
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  userFavorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  /**
   * This function is running as soon as the component is mounted
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  /**
   * Gets movies from api call and sets the movies state to return JSON file
   * @returns array holding movies objects
   * @function getAllMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * opens the director dialog from DirectorComponent
   * @param name
   * @param bio
   * @param birthyear
   * @param deathyear
   */
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

  /**
   * opens the movie genre dialog from GenreComponent
   * @param name
   * @param description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description
      }
    });

  }

  /**
   * opens the user genre dialog from SynopsisComponent
   * @param title
   * @param description
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description
      }
    });
  }

  /**
   * Gets user data from api call and sets the user variable to returned JSON file
   * @returns object holding user information
   * @function getUserInfo
   */
  getUser(): void {
    this.fetchApiData.getUserInfo().subscribe((response: any) => {
      console.log(response);
      this.userFavorites = response.FavoriteMovies;
      console.log('userFavs is :' + this.userFavorites);
    });
  }

  /**
   * adds a movie to user's favorite list via an API call
   * @param id 
   * @function addToFavorite
   */
  addToFavorites(id: string): void {
    this.fetchApiData.addToFavorite(id).subscribe((response) => {
      this.ngOnInit();
    });
  }

  /**
   * removes a movie from user's favorite list via an API call
   * @param id 
   * @function removeFromFavorite
   */
  removeFromFavorites(id: string): void {
    this.fetchApiData.removeFromFavorite(id).subscribe((response) => {
      this.ngOnInit();
    })
  }

  /**
   * checks if a movie is included in the user's favorite list
   * @param id 
   * @returns  true, if the movie is a favorite move, else false
   */
  isFavorite(id: string): boolean {
    return this.userFavorites.includes(id);
  }

}

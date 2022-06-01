import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-app-902522.herokuapp.com/';



@Injectable({
  providedIn: 'root'
})

/**
 * This class provides api services to the rest API endpoints
 */
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  /**
   * Making the api call for the user registration endpoint
   * @param userDetails
   *  @returns a new user object in JSON format
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Making the api call for the user login endpoint
   * @param userDetails
   * @returns data of the user in JSON format 
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Making the api call to get all the movies
   * @returns an array of all movies in a JSON format
   */
  public getAllMovies(): Observable<any> {
    // Get Authorization token stored in localStorage when login 
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /** Making the api call to get the infos of a single movie
   * @param title
   * @return movie data in JSON format
   */
  public getMovieData(title: any): Observable<any> {
    // Get Authorization token stored in localStorage when login 
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /** Making the api call to get certain director data
   * @param name
   * @return director info in JSON format
   */
  public getDirectorInfo(name: any): Observable<any> {
    // Get Authorization token stored in localStorage when login 
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + `directors/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /** Making the api call to get genre description
   * @param title
   * @return genre discription as a text message
   */
  public getGenreDesc(title: any): Observable<any> {
    // Get Authorization token stored in localStorage when login 
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + `genres/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /** Making the api call to get user Info
   * @returns user info in a JSON format
   */
  public getUserInfo(): Observable<any> {
    // Get Authorization token stored in localStorage when login 
    const token = localStorage.getItem('token');

    // Get username stored in localStorage when login
    const username = localStorage.getItem('user');

    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /** Making the api call to update user info
   * @param username, userdetails
   * @returns updated user info in a JSON format
   */
  public updateUserInfo(updatedInfo: any): Observable<any> {
    // Get Authorization token stored in localStorage when login 
    const token = localStorage.getItem('token');

    // Get username stored in localStorage when login
    const username = localStorage.getItem('user');

    return this.http
      .put(apiUrl + `users/${username}`,
        updatedInfo, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /** Making the api call to add a movie to user's favorite list
   * @param movieid
   * @returns updated user info in a JSON format
   */
  public addToFavorite(movieId: any): Observable<any> {
    // Get Authorization token stored in localStorage when login 
    const token = localStorage.getItem('token');

    // Get username stored in localStorage when login
    const username = localStorage.getItem('user');

    return this.http
      .post(apiUrl + `users/${username}/${movieId}`, {}, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /** Making the api call to delete a movie to user's favorite list
   * @param movieid
   * @returns updated user info in a JSON format
   */
  public removeFromFavorite(movieId: any): Observable<any> {
    // Get Authorization token stored in localStorage when login 
    const token = localStorage.getItem('token');

    // Get username stored in localStorage when login
    const username = localStorage.getItem('user');

    return this.http
      .delete(apiUrl + `users/${username}/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  /** Making the api call to deregister the user
   * @returns a text message
   */
  public deleteUser(): Observable<any> {
    // Get Authorization token stored in localStorage when login 
    const token = localStorage.getItem('token');

    // Get username stored in localStorage when login
    const username = localStorage.getItem('user');

    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /** Extract non-typed response from http response
   * @params res
   * @returns response body (incase there is a body) or an empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * handles errors
   * @param error 
   * @returns error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
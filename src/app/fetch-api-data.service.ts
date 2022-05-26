import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-app-902522.herokuapp.com/';

// Get Authorization token stored in localStorage when login 
const token = localStorage.getItem('token');

// Get username stored in localStorage when login
const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Making the api call for the user registration endpoint
  // @params userDetails
  // @returns a new user object in JSON format
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Making the api call for the user login endpoint
  // @params username and password
  // @return data of the user in JSON format 
  public userLogin(username: any, password: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', {
        Username: username,
        Password: password
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Making the api call to get all the movies
  // @return an array of all movies in a JSON format
  public getAllMovies(): Observable<any> {
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

  // Making the api call to get the infos of a single movie
  // @params title
  // @return movie data in JSON format 
  public getMovieData(title: any): Observable<any> {
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

  // Making the api call to get certain director data
  // @params name
  // @return director info in JSON format
  public getDirectorInfo(name: any): Observable<any> {
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

  // Making the api call to get genre description
  // @params title
  // @return genre discription as a text message
  public getGenreDesc(title: any): Observable<any> {
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

  // Making the api call to get user Info
  // @params username
  // @returns user info in a JSON format
  public getUserInfo(username: any): Observable<any> {
    return this.http
      .get(apiUrl + 'users', {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'username': username
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call to update user info
  // @params username, userdetails
  // @returns updated user info in a JSON format
  public updateUserInfo(username: any, updatedInfo: any): Observable<any> {
    return this.http
      .put(apiUrl + `users/${username}`, {
        updatedInfo,
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call to add a movie to user's favorite list
  // @params username, movieid
  // @returns updated user info in a JSON format
  public addToFavorite(username: any, movieId: any): Observable<any> {
    return this.http
      .post(apiUrl + `users/${username}/${movieId}`, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call to delete a movie to user's favorite list
  // @params username, movieid
  // @returns updated user info in a JSON format
  public removeFromFavorite(username: any, movieId: any): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${username}/${movieId}`, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  // Making the api call to deregister the user
  // @params username
  // @returns a text message

  public deleteUser(username: any): Observable<any> {
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

  // Extract non-typed response from http response
  // @params res
  // @returns response body (incase there is a body) or an empty object
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }


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
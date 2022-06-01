# MyFlixAngularClient

## General notes on this Angular project
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Project description 
Using Angular, build the client-side for an application called myFlix based on its existing server-side code (REST API and database), with supporting documentation. 

### User stories
* As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in. 
**User Flow1**
- User visits the app homepage
- User is presented with the login form
*If user had already an account*
- User will enter the log in information and click login button
- User successfully log in with his/her credentials
- User is presented with the homepage showing a collection of movie cards
*If user has not an account yet*
- User clicks on register button
- User is presented with registration form
**User Flow2**
- User successfully login and he/she is presented with the homepage showing a collection of movies
- User clicks on “more detail” in each movie card
- User is presented with a single movie card including movie details
**User Flow3**
-User is presented with a single movie card
- User clicks on the director name
- User is presented with the information of movie director
- User clicks on the genre of movie
- User is presented with the information about genre

* As a user, I want to be able to create a profile so I can save data about my favorite movies. 
**User Flow1**
- User clicks on the register button on the login form
- User is presented with registration form
- User enters the required information and clicks on the register button in registration form
- When user is successfully registered, she/ he is presented with login from
**User Flow2**
- When user log in successfully, he/ she clicks on his/her username button in the homepage
- User is presented with profile page including his/her personal information and a list of favorite movies
- User clicks on “Edit info” button
- User is presented with a form to update her/his personal info
**(User Flow3**
- User is in his profile page
- User clicks on “not favorite” button on movie card in his/ her profile page
- User is presented with profile page which does not include the certain movie anymore
- “not favorite” button on the single movie page is replaced by “add to favorite” button
**User Flow4**
- User is in a single movie page
- User clicks on the “add to favorite” button on single movie card
- The Movie is added to her/his favorite list and the profile view updated accordingly 
- The “add to favorite” button will be replaced by “not favorite”


## Development Process for client-side of the movies application using angular
### Install Angular
```
npm install -g @angular/cli
```

### Create a new Angular project in desired folder 
```
ng new my-project-name
```
### Running the server 
```
ng serve --open
```

### Set up app to load data from movie API
1. Set up Angular HttpClient

2. Create Angular Service for Consuming REST API 
  *Create a new Service inside app folder*
  ```
  ng generate service fetch-api-data
  ```

  *Add import statements to fetch-api-data.service.ts file*

3. Implement services logic (class FetchApiDataService) to make API calls in order to: 
* User registration
* User login
* Get all movies
* Get a single movie
* Get director info
* Get genre description
* Get user
* Edit user
* Delete user and
* Delete a movie from the favorite movies
* Add a movie to favourite Movies


### Add Angular Material to application to style the UI
```
ng add @angular/material
```

### Create components for user to use application
```
$ ng generate component my-component-name
```

### Add routing to application
1. Import Angular's built-in router:

2. Add to app.component.html
```
<router-outlet></router-outlet> 
```
3. Create routes in app.module.ts

### Deploy application on github pages

1. Create github repository for application and link the new remote repository to the local project folder. 
2. Add angular-cli-ghpages by running 
```
ng add angular-cli-ghpages.
```
3. Build your application using the following command
```bash
 ng deploy --base-href=/<repository-name>/.
```






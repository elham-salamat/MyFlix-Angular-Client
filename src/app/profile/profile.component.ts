import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};

  username: any = localStorage.getItem('user');
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  /**
   * This function is running as soon as the component is mounted
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * adds a movie to user's favorite list via an API call
   * @param id 
   * @function addToFavorite
   */
  getUser(): void {
    this.fetchApiData.getUserInfo().subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
      return this.user;
    })
  }

  /**
   * opens the edit profile dialog from EditProfileComponent, allowing user to edit their details
   */
  openEditInfoDialog(username: string, email: string, birthday: Date, nationality: string): void {
    this.dialog.open(EditProfileComponent, {
      data: {
        Username: username,
        Email: email,
        Birthday: birthday,
        Nationality: nationality
      }
    });
  }

  /**
   * deletes the user profile, redirects to welcome screen
   * @function deleteUser
   */
  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account successfully deleted', 'OK', {
          duration: 2000
        });
      })
      this.fetchApiData.deleteUser().subscribe((response) => {
        console.log(response);
        localStorage.clear();
      })
    }
  }


}

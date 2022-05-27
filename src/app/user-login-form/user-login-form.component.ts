import { Component, OnInit, Input } from '@angular/core';

//module needed to close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Module used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//importing API calls
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // sending login credentials to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      // if user login successfully 

      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);

      console.log(response);
      this.snackBar.open('you are logged in successfuly', 'OK', {
        duration: 2000
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}

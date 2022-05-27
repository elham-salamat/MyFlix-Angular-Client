import { Component, OnInit, Input } from '@angular/core';

// Module used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Module used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//importing API calls
import { FetchApiDataService } from '../fetch-api-data.service';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', Nationality: '' }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // sending form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // if successful user registration happens
      this.dialogRef.close(); // close the modal on success
      console.log(response);
      this.snackBar.open('You signed up successfully', 'OK', {
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

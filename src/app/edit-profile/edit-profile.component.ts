import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

/**
 * This class creates the dialog, where user can update her/his information
 */
export class EditProfileComponent implements OnInit {

  // Setting the initial value for input fields in the form
  @Input() userData: any = {
    Username: this.data.Username,
    Email: this.data.Email,
    Birthday: this.data.Birthday,
    Nationality: this.data.Nationality
  }

  constructor(

    @Inject(MAT_DIALOG_DATA) // It used to access the data that was passed in a dialog
    public data: {
      Username: string,
      Email: string,
      Birthday: Date,
      Nationality: string
    },
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * updates user info using API call, showing updated info as soon as they changed
   * @function updateUserInfo
   */
  editUserInfo(): void {
    console.log(this.userData);
    this.fetchApiData.updateUserInfo(this.userData).subscribe((response) => {
      this.dialogRef.close();
      console.log(response);

      // When the update successfully done
      this.snackBar.open('Your info updated successfully! Please log in again to see the changes', 'OK', {
        duration: 2000
      });

      // Reloading the profile page as soon as the dialog close, updating the profile page info 
      setTimeout(() => {
        window.location.reload();
      });
    })
  }

}

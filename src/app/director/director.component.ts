import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})

/**
 * This class extracts director information and creates director page
 */
export class DirectorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) // It used to access the data that was passed in a dialog
    public data: {
      Name: string,
      Bio: string,
      BirthYear: number,
      DeathYear: number
    }
  ) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})

/**
 * This class extracts movie details and creates synopsis page
 */
export class SynopsisComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) // It used to access the data that was passed in a dialog
    public data: {
      Title: string,
      Description: string
    }
  ) { }

  ngOnInit(): void {
  }

}

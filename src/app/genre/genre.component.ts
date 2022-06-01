import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})

/**
 * This class extracts genre details and creates genre page
 */
export class GenreComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) // It used to access the data that was passed in a dialog
    public data: {
      Name: string,
      Description: string
    }
  ) { }

  ngOnInit(): void {
  }

}

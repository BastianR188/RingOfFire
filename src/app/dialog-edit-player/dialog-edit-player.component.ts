import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-player',
  templateUrl: './dialog-edit-player.component.html',
  styleUrls: ['./dialog-edit-player.component.scss']
})
export class DialogEditPlayerComponent {
  allProfilPictures = ['11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '2.svg', '3.svg', '4.svg', '6.svg', '7.svg', '8.svg', '9.svg'];


  constructor(public dialogRef: MatDialogRef<DialogEditPlayerComponent>,) { }

  deletePlayer() {
    this.dialogRef.close();
  }
}


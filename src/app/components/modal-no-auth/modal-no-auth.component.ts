import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-no-auth',
  templateUrl: './modal-no-auth.component.html',
  styleUrls: ['./modal-no-auth.component.css']
})
export class ModalNoAuthComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalNoAuthComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    //this.getEvolution();
  }

  actionFunction() {
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}

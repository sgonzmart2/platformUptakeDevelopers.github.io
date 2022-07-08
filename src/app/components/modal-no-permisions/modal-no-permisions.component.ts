import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-no-permisions',
  templateUrl: './modal-no-permisions.component.html',
  styleUrls: ['./modal-no-permisions.component.css']
})
export class ModalNoPermisionsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalNoPermisionsComponent>,
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

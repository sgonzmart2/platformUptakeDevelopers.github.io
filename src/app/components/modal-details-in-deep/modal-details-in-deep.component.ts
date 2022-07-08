import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContextualQDOAService } from 'src/app/api/DOA/contextual-q-doa.service';
import { Comments, Rating } from 'src/app/models/ratings';

@Component({
  selector: 'app-modal-details-in-deep',
  templateUrl: './modal-details-in-deep.component.html',
  styleUrls: ['./modal-details-in-deep.component.css']
})
export class ModalDetailsInDeepComponent implements OnInit {
  developerQuestionSelected: Rating
  listOfComments: Comments[] = [];
  isLoading = true
  platform_id
  constructor(
    public dialogRef: MatDialogRef<ModalDetailsInDeepComponent>,
    private contextualQDoa: ContextualQDOAService,
    @Inject(MAT_DIALOG_DATA) private modalData: any
  ) { }

  ngOnInit() {
    this.getEvolution();
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

  getEvolution() {
    this.platform_id = this.modalData.platform_id
    this.developerQuestionSelected = this.modalData.rating
    this.getDevelopersComents(this.developerQuestionSelected.developerquestion_id)

  }

  getTemplate(rate) {
    if (rate < 2.5) {
      return "half_red"
    }
    else if (rate < 4) {
      return "half_gold"
    }
    else {
      return "half_green"
    }
  }

  getDevelopersComents(developerquestion_id) {
    this.listOfComments = [];

    this.contextualQDoa.getDevelopersComments(this.platform_id, developerquestion_id).subscribe(
      response => {
        this.isLoading = false
        this.listOfComments = response['comments'];
      });
  }



}

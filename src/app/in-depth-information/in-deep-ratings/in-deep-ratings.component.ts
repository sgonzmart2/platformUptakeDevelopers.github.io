import { Component, OnInit } from '@angular/core';
import { ContextualQDOAService } from 'src/app/api/DOA/contextual-q-doa.service';
import { Comments, Rating, Rating_details } from 'src/app/models/ratings';
import { FunctionsComponent } from 'src/app/utilities/functions';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalDetailsInDeepComponent } from 'src/app/components/modal-details-in-deep/modal-details-in-deep.component';

@Component({
  selector: 'app-in-deep-ratings',
  templateUrl: './in-deep-ratings.component.html',
  styleUrls: ['./in-deep-ratings.component.css']
})
export class InDeepRatingsComponent implements OnInit {

  platform: any;
  is_grid_view = false;
  arrayRows: any[];
  ratingsList: Rating[] = [];
  developerQuestionSelected: Rating
  listOfComments: Comments[] = [];
  isLoading = true;
  constructor(private contextualQDoa: ContextualQDOAService,
    public matDialog: MatDialog) { }

  ngOnInit() {
    let f = new FunctionsComponent();
    this.platform = f.getPlatformSelected();
    this.getRatings();
  }

  changeToGridView(value: boolean) {
    this.is_grid_view = value;
  }

  getRatings() {
    let f = new FunctionsComponent();
    this.arrayRows = [];

    this.contextualQDoa.getDevQuestAndRatingsByPlatform(this.platform.platform_id).subscribe(
      response => {
        let list = response['developer_questions'];
        list.forEach(item => {
          let rating: Rating;
          rating = item;
          rating.developerquestion_type_abb = f.getTypeDeveloperQ(item.developerquestion_type_id)
          if (rating.hastext) {
            rating.hastext = false;
            this.contextualQDoa.getDevelopersComments(this.platform.platform_id, item.developerquestion_id).subscribe(
              response => {
                this.isLoading = false;
                let comments = response["comments"]
                if (rating.developerquestion_type_abb == 'T')
                  rating.numberofratings = comments.length
                if (comments.length > 0)
                  rating.hastext = true;
              }
            )
          }
          let RtDetails = rating.rating_details;
          let RTDetailsFixed: Rating_details[] = [];
          let array = this.counter(6)
          for (let i = 1; i < array.length; i++) {
            let itemDetail = {} as Rating_details;
            itemDetail.numberofappearances = 0;
            itemDetail.rating = i;
            if (RtDetails != null) {
              RtDetails.forEach(detail => {
                if (detail.rating == i) {

                  itemDetail.numberofappearances = detail.numberofappearances;
                }
              })
              RTDetailsFixed.push(itemDetail);
            }
          }
          rating.rating_details = RTDetailsFixed;
          this.ratingsList.push(rating);
        });
        var arraySize = 4;
        for (var i = 0; i < Math.ceil(this.ratingsList.length / arraySize); i++) {
          this.arrayRows.push(this.ratingsList.slice(i * arraySize, i * arraySize + arraySize));
        }
      });
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

  buttonSeeDetails(rating: Rating) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "80%";
    dialogConfig.width = "80%";
    dialogConfig.data = {
      rating: rating,
      platform_id: this.platform.platform_id
    }
    const modalDialog = this.matDialog.open(ModalDetailsInDeepComponent, dialogConfig,);

  }

  counter(i: number) {

    return new Array(i);
  }


}

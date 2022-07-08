import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ContextualQDOAService } from 'src/app/api/DOA/contextual-q-doa.service';
import { FunctionsComponent } from 'src/app/utilities/functions';
import { DeveloperFeedbackQuestions } from 'src/app/models/ratings';

export interface itemArrayCharts {
  title: string;
  labels: Label[];
  values: ChartDataSets[];
}


@Component({
  selector: 'app-in-deep-feedback',
  templateUrl: './in-deep-feedback.component.html',
  styleUrls: ['./in-deep-feedback.component.css']
})
export class InDeepFeedbackComponent implements OnInit {

  platform;
  public chartDataSetDevelpersQ: ChartDataSets[]

  arrayCharts = [] as itemArrayCharts[];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 1,
          suggestedMin: 0,
          suggestedMax: 1,
        }
      }]
    },

    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }

  };

  isLoading = true;

  constructor(
    private contextualQDoa: ContextualQDOAService) { }

  ngOnInit() {
    let f = new FunctionsComponent();
    this.platform = f.getPlatformSelected();
    this.contextualQDoa.getPlatformFeedback(this.platform.platform_id).subscribe(
      response => {
        let list = response['questions'];


        list.forEach(item => {
          let devQuest: DeveloperFeedbackQuestions;
          devQuest = item;

          let chartDataItemArray = {} as itemArrayCharts;
          chartDataItemArray.values = [{ data: [], fill: false, hoverBackgroundColor: "rgb(35, 166, 173)", backgroundColor: "rgb(35, 166, 173)", label: '' }];

          let feedbackAnswers = devQuest.answers;
          let labelsArray: Label[] = new Array<string>();
          let valuesArray: number[] = [];
          chartDataItemArray.title = devQuest.developerquestion_title;
          feedbackAnswers.forEach(ans => {

            labelsArray.push(ans.answer_title)
            valuesArray.push(ans.answer_count)
          })

          chartDataItemArray.values[0]["data"] = valuesArray;
          chartDataItemArray.labels = labelsArray;
          this.arrayCharts.push(chartDataItemArray);
        });
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      });
  }

}

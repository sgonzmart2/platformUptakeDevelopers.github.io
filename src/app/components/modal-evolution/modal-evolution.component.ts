import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import *  as constants from '../../utilities/constants';
import { TranslateService } from '@ngx-translate/core';
import { ScoresDOAService } from 'src/app/api/DOA/scores-doa.service';
import { FunctionsComponent } from 'src/app/utilities/functions';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';

@Component({
  selector: 'app-modal-evolution',
  templateUrl: './modal-evolution.component.html',
  styleUrls: ['./modal-evolution.component.css']
})
export class ModalEvolutionComponent implements OnInit {

  public chartEvolution: ChartDataSets[] = [
    { data: [], fill: false, hoverBackgroundColor: "rgb(35, 166, 173)", backgroundColor: "rgb(35, 166, 173)", label: '' }
  ];

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

  typeGraph;

  public barChartEvolutionLabels: Label[];

  f = new FunctionsComponent();
  periods = this.f.getValidKPIValuesPeriods();
  constructor(private scoresService: ScoresDOAService,
    private secureStorage: EncryptedStorageService,
    public dialogRef: MatDialogRef<ModalEvolutionComponent>,
    private translate: TranslateService,
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
    this.barChartEvolutionLabels = new Array<string>()

    let data = [];
    let nameGraph = "";
    let titleName = "";

    if (this.modalData.type == "dimension") {

      if (this.modalData.dimension == constants.KPI_dimension.T) {
        nameGraph = "technical_label";
      }
      else if (this.modalData.dimension == constants.KPI_dimension.B) {
        nameGraph = "business_label";
      }
      else if (this.modalData.dimension == constants.KPI_dimension.C) {
        nameGraph = "contextual_label";
      }


      this.scoresService.scoreEvolutionOfPlatformDimesionOrCluster(this.modalData.platform_id, true, this.modalData.score_id).subscribe(
        response => {
          let responseData = response['scores'];
          responseData.reverse().forEach(item => {
            data.push(item["score"]);
            let label = this.getPeriodTitle(item["period_id"])
            if (label != undefined)
              this.barChartEvolutionLabels.push(label)
          })

        });

      this.translate.get(nameGraph).subscribe(i => {
        titleName = i;
      })
    }
    else if (this.modalData.type == "cluster") {
      let listClusters = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_cluster));
      listClusters.forEach(cluster => {
        if (this.modalData.score_id == cluster.cluster_id) {
          titleName = cluster.cluster_title
        }
      });
      /*
            if (this.modalData.cluster_id == constants.KPI_cluster.EUC) {
              nameGraph = "euc_label";
            }
            else if (this.modalData.cluster == constants.KPI_cluster.GOV) {
              nameGraph = "gov_label";
            }
            else if (this.modalData.cluster == constants.KPI_cluster.PEU) {
              nameGraph = "peu_label";
            }
      
            else if (this.modalData.cluster == constants.KPI_cluster.TP) {
              nameGraph = "tp_label";
            }
      */
      this.scoresService.scoreEvolutionOfPlatformDimesionOrCluster(this.modalData.platform_id, false, this.modalData.score_id).subscribe(
        response => {
          let responseData = response['scores'];
          responseData.reverse().forEach(item => {
            data.push(item["score"]);
            let label = this.getPeriodTitle(item["period_id"])
            if (label != undefined)
              this.barChartEvolutionLabels.push(label)

          })

        });

    }


    this.translate.get('evolution_of_XXX_title', { NAME: titleName }).subscribe(i => {
      this.typeGraph = i;
    })

    this.translate.get(this.modalData.type).subscribe(val => {
      this.typeGraph = this.typeGraph + val;
    })
    this.chartEvolution[0]["data"] = data;
  }

  getPeriodTitle(id): string {
    let periodTitle
    this.periods.forEach(period => {
      if (id == period.measurement_period_id) {
        periodTitle = period.from_date + "  to  " + period.until_date;
      }

    })
    return periodTitle
  }
}

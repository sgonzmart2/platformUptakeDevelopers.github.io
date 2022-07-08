import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'src/app/models/platform';
import { KpiDoaService } from 'src/app/api/DOA/kpi-doa.service';
import { FunctionsComponent } from '../../utilities/functions';
import { QCValues } from 'src/app/models/kpis';

@Component({
  selector: 'app-modal-evolution-kpi',
  templateUrl: './modal-evolution-kpi.component.html',
  styleUrls: ['./modal-evolution-kpi.component.css']
})
export class ModalEvolutionKpiComponent implements OnInit {

  public chartNormalizedEvolution: ChartDataSets[] = [
    { data: [], fill: false, hoverBackgroundColor: "rgb(35, 166, 173)", backgroundColor: "rgb(35, 166, 173)", label: '' }
  ];

  public chartOriginalEvolution: ChartDataSets[] = [
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

  public barChartOptionsOriginal: ChartOptions = {
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

  nameGraph;

  public barChartNormalLabels: Label[];
  public barChartOriginalLabels: Label[];
  f = new FunctionsComponent();
  platformSelected: Platform = this.f.getPlatformSelected();

  periods = this.f.getValidKPIValuesPeriods();
  constructor(
    public dialogRef: MatDialogRef<ModalEvolutionKpiComponent>,
    private translate: TranslateService,
    private kpiServices: KpiDoaService,
    @Inject(MAT_DIALOG_DATA) private modalData: any
  ) { }

  ngOnInit() {
    this.getKPIEvolution();
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

  getKPIEvolution() {
    let kpi_id = this.modalData.kpi_id;
    let KPI = this.f.getKPIDetailsById(kpi_id);
    this.translate.get('kpi_evolution_over_time').subscribe(value => {
      this.nameGraph = 'KPI_'
      if (kpi_id < 10) {
        this.nameGraph += '0'
      }
      this.nameGraph += kpi_id + ' ' + value;
    });


    this.barChartNormalLabels = new Array<string>()
    this.barChartOriginalLabels = new Array<string>()

    let dataNormal = [];
    let dataOriginal = [];
    this.kpiServices.getKPIEvolutionByPlatId(this.platformSelected.platform_id, kpi_id).subscribe(
      response => {
        let responseData = response['KPI_values'];
        responseData.forEach(item => {
          let label = this.getPeriodTitle(item["period_id"])
          if (label != undefined) {
            dataNormal.push(item["normalized_value"]);
            dataOriginal.push(item["original_value"]);
            this.barChartNormalLabels.push(this.f.getKPIPeriodTitleForChart(item["period_id"]))
            this.barChartOriginalLabels.push(this.f.getKPIPeriodTitleForChart(item["period_id"]))
          }
        })
      });
    if (KPI.category_id == 4 || KPI.category_id == 5) {
      let list = this.getQualitativeValues(KPI.qualitative_values);
      this.barChartOptionsOriginal.scales.yAxes[0].labels = list
      this.barChartOptionsOriginal.scales.yAxes[0].type = 'category'
    }
    this.chartNormalizedEvolution[0]["data"] = dataNormal;
    this.chartOriginalEvolution[0]["data"] = dataOriginal;
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

  getQualitativeValues(list: QCValues[]) {
    let labesYAxis = [];
    list.forEach(item => {
      labesYAxis.push(item.originalvalue)
    })
    return labesYAxis
  }
}

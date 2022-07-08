import { Component, OnInit } from '@angular/core';
import *  as constants from '../../utilities/constants';
import { KpiDoaService } from 'src/app/api/DOA/kpi-doa.service';
import { KPIs, KPIsClass, QCValues } from 'src/app/models/kpis';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';

@Component({
  selector: 'app-dm-kpi-definition',
  templateUrl: './dm-kpi-definition.component.html',
  styleUrls: ['./dm-kpi-definition.component.css']
})
export class DmKpiDefinitionComponent implements OnInit {

  errorMsg = "";
  submitted = false;
  updateList = false;
  kpi_id = 'KPI_XX';
  showHigher = false;
  isLoading = true;
  editing = false;
  isSaving = false;

  kpi_categories_list = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_category));
  kpi_dimension_names = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_dimension));
  kpi_cluster_names = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_cluster));
  KPIs_list = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_KPIs_list));
  KPI_Selected: KPIsClass;
  kpi_selected_index = -1;
  showNewKPI = false;
  columnsTitle = [];
  normalValues = [0, 1, 2, 3, 4,]
  normalValuesBoolean = [0, 4]
  originalValuesBoolean = ["Yes", "No"]
  QCValues = [];

  constructor(
    private secureStorage: EncryptedStorageService,
    private kpiServices: KpiDoaService) { }

  ngOnInit() {
    this.getData();
    if (this.KPIs_list != undefined) {
      this.isLoading = false;
    }

    this.columnsTitle = ['KPI_id', 'KPI_name', 'KPI_description', 'dimension', 'cluster', 'category', 'edit_button'];
  }

  getData() {
    this.KPIs_list = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_KPIs_list));

    this.kpiServices.getAllKPIsList().subscribe(response => {
      let listResponse = response['KPI_characteristics'];
      listResponse.forEach(kpi => {
        let kpiToSave = {} as KPIs
        kpiToSave = kpi;
        if (kpi['larger_is_better']) {
          kpiToSave.zero_right = kpi["1left"];
          kpiToSave.one_left = kpi["1left"];
          kpiToSave.one_right = kpi["2left"];
          kpiToSave.two_left = kpi["2left"];
          kpiToSave.two_right = kpi["3left"];
          kpiToSave.three_left = kpi["3left"];
          kpiToSave.three_right = kpi["4left"];
          kpiToSave.four_left = kpi["4left"];
        }
        else {
          kpiToSave.zero_right = kpi["0right"];
          kpiToSave.one_left = kpi["0right"];
          kpiToSave.two_left = kpi["1right"];
          kpiToSave.three_left = kpi["2right"];
          kpiToSave.four_left = kpi["3right"];

          kpiToSave.one_right = kpi["1right"];
          kpiToSave.two_right = kpi["2right"];
          kpiToSave.three_right = kpi["3right"];
        }

        /*if (kpi.qualitative_values != []) {
          kpi.qualitative_values.forEach(qualitativeVal => {
            if (qualitativeVal.normalizedvalue == 0) {
              kpiToSave.qualValZero = qualitativeVal.originalvalue;
            }
            else if (qualitativeVal.normalizedvalue == 1) {
              kpiToSave.qualValOne = qualitativeVal.originalvalue;
            }
            else if (qualitativeVal.normalizedvalue == 2) {
              kpiToSave.qualValTwo = qualitativeVal.originalvalue;
            }
            else if (qualitativeVal.normalizedvalue == 3) {
              kpiToSave.qualValThree = qualitativeVal.originalvalue;
            }
            else if (qualitativeVal.normalizedvalue == 4) {
              kpiToSave.qualValFour = qualitativeVal.originalvalue;
            }
          })
        }*/
      })
      this.KPIs_list = listResponse;
      this.isLoading = false;
      this.secureStorage.secureLocalStorage(constants.lSN_KPIs_list, JSON.stringify(listResponse))
    });
  }

  onSubmit() {
  }

  edit(kpi, index) {
    this.isSaving = false;
    this.kpi_selected_index = index;
    this.editing = true;
    this.errorMsg = "";
    this.KPI_Selected = kpi;
    this.showNewKPI = !this.showNewKPI;
  }

  changeView() {
    this.isSaving = false;
    this.editing = false;
    this.errorMsg = "";
    this.KPI_Selected = new KPIsClass()

    let item: QCValues = {
      normalizedvalue: -1,
      originalvalue: ""
    }
    let item2: QCValues = {
      normalizedvalue: -1,
      originalvalue: ""
    }
    let array = new Array()
    array.push(item)
    array.push(item2)
    this.KPI_Selected.qualitative_values = array
    this.showNewKPI = !this.showNewKPI;
    this.getData();
  }

  save() {
    this.isSaving = true;
    this.errorMsg = "";
    if (this.KPI_Selected.larger_is_better == null)
      this.KPI_Selected.larger_is_better = false

    if (this.KPI_Selected.unit_of_measurement == null) {
      this.KPI_Selected.unit_of_measurement = "";
    }

    let body = {
      "kpi_id": this.KPI_Selected.kpi_id,
      "kpi_title": this.KPI_Selected.title,
      "kpi_description": this.KPI_Selected.description,
      "kpi_unitofmeasurement": this.KPI_Selected.unit_of_measurement,
      "kpi_category_id": this.KPI_Selected.category_id,
      "kpi_cluster_id": this.KPI_Selected.cluster_id,
      "kpi_dimension_id": this.KPI_Selected.dimension_id,
      "defaultweight": this.KPI_Selected.default_weight,
      "largerisbetter": this.KPI_Selected.larger_is_better,
      "qualitative_values": this.KPI_Selected.qualitative_values,
      "0left": this.KPI_Selected.zero_left,
      "0right": this.KPI_Selected.zero_right,
      "1left": this.KPI_Selected.one_left,
      "1right": this.KPI_Selected.one_right,
      "2left": this.KPI_Selected.two_left,
      "2right": this.KPI_Selected.two_right,
      "3left": this.KPI_Selected.three_left,
      "3right": this.KPI_Selected.three_right,
      "4left": this.KPI_Selected.four_left,
      "4right": this.KPI_Selected.four_right
    }

    this.KPI_Selected.category_title = this.getCategoryTitle(this.KPI_Selected.category_id)
    this.KPI_Selected.dimension_title = this.getDimensionTitle(this.KPI_Selected.dimension_id)
    this.KPI_Selected.cluster_title = this.getClusterTitle(this.KPI_Selected.cluster_id)

    this.kpiServices.insertNewKPI(body).subscribe(
      response => {
        if (!this.editing) {
          this.KPIs_list.push(this.KPI_Selected)

        }
        else if (this.kpi_selected_index > -1) {
          this.KPIs_list[this.kpi_selected_index] = this.KPI_Selected
        }
        this.secureStorage.secureLocalStorage(constants.lSN_KPIs_list, JSON.stringify(this.KPIs_list))
        this.changeView();
      },
      error => {
        this.errorMsg = "An unexpected error has occurred: " + error.status + " " + error.statusText
      });
  }

  cancel() {
    this.isSaving = false;
    this.showNewKPI = false;
    this.editing = false;
    this.kpi_selected_index = -1;
    this.ngOnInit()
  }

  removeValue(i) {
    this.KPI_Selected.qualitative_values.splice(i, 1);
  }

  addValue() {
    let item: QCValues = {
      normalizedvalue: -1,
      originalvalue: ""
    }
    this.KPI_Selected.qualitative_values.push(item)
  }

  getCategoryTitle(id): string {
    let title = ""
    this.kpi_categories_list.forEach(cat => {
      if (cat.category_id == id) {
        title = cat.category_title
      }
    })
    return title
  }

  getClusterTitle(id): string {
    let title = ""
    this.kpi_cluster_names.forEach(cat => {
      if (cat.cluster_id == id) {
        title = cat.cluster_title
      }
    })
    return title
  }
  getDimensionTitle(id): string {
    let title = ""
    this.kpi_dimension_names.forEach(cat => {
      if (cat.dimension_id == id) {
        title = cat.dimension_title
      }
    })
    return title
  }
}

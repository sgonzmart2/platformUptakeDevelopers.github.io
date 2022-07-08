import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlatformsDOAService } from 'src/app/api/DOA/platforms-doa.service';
import { KPIs, NewKPIValue, NewKPIValueItemArrayPlatforms, newKPIVALUEListValues } from 'src/app/models/kpis';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import *  as constants from '../../utilities/constants';
import { KpiDoaService } from 'src/app/api/DOA/kpi-doa.service';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';
import { user } from 'src/app/models/user';
import { UserDOAService } from 'src/app/api/DOA/user-doa.service';


export interface itemListKPIValue {
  kpi_id: number;
  original_value: string;
  normalized_value: number;
  title: string;
  description: string;
  category_id: number;
  qualitative_values: string[];
  unit_of_measurement: string;
}

export interface platformInfo {
  listKPIs: itemListKPIValue[];
}

@Component({
  selector: 'app-dm-kpi-values',
  templateUrl: './dm-kpi-values.component.html',
  styleUrls: ['./dm-kpi-values.component.css']
})
export class DmKpiValuesComponent implements OnInit {
  @ViewChild("addEditValue") addEditValueModal: ElementRef;
  periods = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_measurementsPeriodKPIValues));
  period_selected_id;
  period_selected_title;
  kpi_selected_title;
  kpi_selected_category_id;
  kpi_selected_unit;
  kpi_selected_description
  kpi_selected_qualitative_values;
  platform_selected_id
  KPI_select_id;
  index1_edit;
  index2_edit;

  columnsTitle = [];

  pltfm_title = "";
  platform_logo_URL = "";
  valueToChange = null;

  error = '';
  submitted = false;
  isLoading = true;

  platforms = [];
  isAdmin = false;

  user: user
  kpis_list = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_KPIs_list));
  constructor(private platformService: PlatformsDOAService,
    private secureStorage: EncryptedStorageService,
    private kpiServices: KpiDoaService,
    private modalService: NgbModal,
    private userDao: UserDOAService) {
    this.isAdmin = this.userDao.userIsAdmin();
    this.user = JSON.parse(this.secureStorage.decryptSecureStorage(constants.user_info));
  }

  ngOnInit() {
    this.period_selected_id = this.periods[0].measurement_period_id;
    this.refreshPageWithNewPeriod();
    this.columnsTitle = ['KPI_ID', 'KPI_name', 'original_value', 'edit_button'];
  }

  refreshPageWithNewPeriod() {
    this.period_selected_title = "";
    let indexPeriod = this.periods.findIndex(x => x.measurement_period_id === this.period_selected_id);
    if (indexPeriod > -1) {
      this.period_selected_title = this.periods[indexPeriod].measurement_period_title;
    }
    if (this.kpis_list != undefined) {
      this.isLoading = false;
    }
    this.platforms = [];
    this.platformService.updatePlatformsInfo();
    this.kpiServices.getAllKPIsList().subscribe(response => {
      let listResponse = response['KPI_characteristics'];
      this.kpis_list = listResponse;
      this.isLoading = false;
      this.secureStorage.secureLocalStorage(constants.lSN_KPIs_list, JSON.stringify(listResponse))
    });
    let platforms_info = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_platformsList));
    platforms_info.forEach(item => {
      let addPlatform = false
      if (this.isAdmin) {
        addPlatform = true
      }
      let index = this.user.corresponding_platform_id.findIndex(x => x === item.platform_id);
      if (index != -1) {
        addPlatform = true;
      }
      if (addPlatform) {
        let kpiItemValues: itemListKPIValue[] = [];

        this.kpis_list.forEach(item => {
          let kpiValue = {} as itemListKPIValue;
          kpiValue.title = item.title;
          kpiValue.description = item.description;
          kpiValue.original_value = '--';
          kpiValue.normalized_value = null;
          kpiValue.kpi_id = item.kpi_id;
          kpiValue.category_id = item.category_id;
          let array = [];
          item.qualitative_values.forEach(qualitative => {
            array.push(qualitative.originalvalue)
          })
          kpiValue.qualitative_values = array;
          kpiValue.unit_of_measurement = item.unit_of_measurement;
          kpiItemValues.push(kpiValue);
        })
        let platInfo: platformInfo;
        platInfo = item;
        platInfo.listKPIs = kpiItemValues;


        this.platforms.push(platInfo);
      }
    })


    this.kpiServices.getKPIsValuesByPeriodId(this.period_selected_id).
      subscribe(result => {
        let responselistKPIs = result['KPI_values'];
        responselistKPIs.forEach(itemValue => {
          let index = this.platforms.findIndex(x => x.platform_id === itemValue.platform_id);
          if (index > -1) {
            let listValuesKpis = this.platforms[index].listKPIs;

            let index2 = listValuesKpis.findIndex(x => x.kpi_id === itemValue.kpi_id);
            if (index2 > -1) {
              listValuesKpis[index2].original_value = itemValue.original_value;
              listValuesKpis[index2].normalized_value = itemValue.normalized_value;
              this.platforms[index].listKPIs = listValuesKpis;
            }
          }
        })
      })
  }

  edit(pltform_id, KPI_ID) {
    this.platform_selected_id = pltform_id;
    this.KPI_select_id = KPI_ID;
    let index = this.platforms.findIndex(x => x.platform_id === pltform_id);
    this.index1_edit = index;
    if (index > -1) {
      let platformInfor = this.platforms[index]
      let listValuesKPI = platformInfor.listKPIs;
      let index2 = listValuesKPI.findIndex(x => x.kpi_id === KPI_ID);
      this.index2_edit = index2;
      if (index2 > -1) {
        this.kpi_selected_title = listValuesKPI[index2].title
        this.kpi_selected_description = listValuesKPI[index2].description
        this.kpi_selected_category_id = listValuesKPI[index2].category_id
        this.kpi_selected_qualitative_values = listValuesKPI[index2].qualitative_values;
        this.kpi_selected_unit = listValuesKPI[index2].unit_of_measurement;
        if (listValuesKPI[index2].original_value != "--") {
          this.valueToChange = listValuesKPI[index2].original_value;
        }
        else {
          this.valueToChange = null;
        }
      }

      this.pltfm_title = platformInfor.title;
      this.platform_logo_URL = platformInfor.platform_logo_URL;
      this.modalService.open(this.addEditValueModal, { size: 'lg', ariaLabelledBy: 'modal-basic-title' });
    }
  }

  save() {
    let body = {} as NewKPIValue;

    body.period_id = this.period_selected_id;
    body.platforms_with_kpis = []

    let listPlatforms = {} as NewKPIValueItemArrayPlatforms;
    listPlatforms.platform_id = this.platform_selected_id;
    listPlatforms.KPI_values = [];
    let listKPISnewValues = {} as newKPIVALUEListValues;

    listKPISnewValues.kpi_id = this.KPI_select_id;
    listKPISnewValues.kpi_value = this.valueToChange;

    listPlatforms.KPI_values.push(listKPISnewValues);
    body.platforms_with_kpis.push(listPlatforms);

    this.kpiServices.insertNewKPIValue(body).subscribe(
      response => {
        this.platforms[this.index1_edit].listKPIs[this.index2_edit].original_value = this.valueToChange
        this.modalService.dismissAll();
      },
      error => {
        this.modalService.dismissAll();
      });;
  }
}

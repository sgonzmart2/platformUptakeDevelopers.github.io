import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';
import *  as constants from '../../../utilities/constants';

@Component({
  selector: 'app-pc-dimension-menu',
  templateUrl: './pc-dimension-menu.component.html',
  styleUrls: ['./pc-dimension-menu.component.css']
})
export class PCDimensionMenuComponent implements OnInit {
  @Input() selectedPlatforms: any[];
  @Output() selectedPlatformsUpdate = new EventEmitter<any>();
  selected_tab_dim_contextual = false;
  selected_tab_dim_bussiness = false;
  selected_tab_dim_tech = true;

  contextual_label;
  business_label;
  technical_label;
  constructor(private secureStorage: EncryptedStorageService) { }

  ngOnInit() {
    let kpi_dimension_names = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_dimension));
    kpi_dimension_names.forEach(d => {
      if (d.dimension_abbreviation === "C") {
        this.contextual_label = d.dimension_title;
      }
      else if (d.dimension_abbreviation === "B") {
        this.business_label = d.dimension_title;
      }
      else if (d.dimension_abbreviation === "T") {
        this.technical_label = d.dimension_title;
      }
    })
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index == 0) {
      this.selected_tab_dim_contextual = false;
      this.selected_tab_dim_bussiness = false;
      this.selected_tab_dim_tech = true;
    }
    else if (tabChangeEvent.index == 1) {
      this.selected_tab_dim_contextual = false;
      this.selected_tab_dim_bussiness = true;
      this.selected_tab_dim_tech = false;
    }
    else if (tabChangeEvent.index == 2) {
      this.selected_tab_dim_contextual = true;
      this.selected_tab_dim_bussiness = false;
      this.selected_tab_dim_tech = false;
    }
  }

  updateSelectedPlatforms(event) {
    this.selectedPlatformsUpdate.emit(event)
  }
}

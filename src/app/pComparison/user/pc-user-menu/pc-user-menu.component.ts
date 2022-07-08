import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';
import { FunctionsComponent } from 'src/app/utilities/functions';
import *  as constants from '../../../utilities/constants';

@Component({
  selector: 'app-pc-user-menu',
  templateUrl: './pc-user-menu.component.html',
  styleUrls: ['./pc-user-menu.component.css']
})
export class PCUserMenuComponent implements OnInit {
  @Input() selectedPlatforms: any[];
  @Output() selectedPlatformsUpdate = new EventEmitter<any>();

  kpi_cluster_names = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_cluster));
  f = new FunctionsComponent();

  selected = new FormControl(0);
  constructor(private secureStorage: EncryptedStorageService) {
    this.f.setClusterSelected(1);
    this.selected.setValue(1)
  }

  ngOnInit() {
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
  }

  updateSelectedPlatforms(event) {
    this.selectedPlatformsUpdate.emit(event)
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';
import *  as constants from '../../../utilities/constants';
import { FormControl } from '@angular/forms';
import { FunctionsComponent } from 'src/app/utilities/functions';

@Component({
  selector: 'app-pm-user-menu',
  templateUrl: './pm-user-menu.component.html',
  styleUrls: ['./pm-user-menu.component.css']
})
export class PMUserMenuComponent implements OnInit {
  kpi_cluster_names = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_cluster));
  f = new FunctionsComponent();
  selected = new FormControl(0);
  constructor(private secureStorage: EncryptedStorageService) {
    this.f.setClusterSelected(1);
    this.selected.setValue(1)
  }

  ngOnInit() {
  }
}

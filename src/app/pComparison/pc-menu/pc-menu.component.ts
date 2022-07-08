import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import *  as config_variables from '../../utilities/config_variables';

@Component({
  selector: 'app-pc-menu',
  templateUrl: './pc-menu.component.html',
  styleUrls: ['./pc-menu.component.css']
})
export class PCMenuComponent implements OnInit {

  selected_tab_gs = true;
  selected_tab_dim = false;
  selected_tab_user_view = false;
  selected_tab_statistics = false;

  selectedPlatforms: any[] = ["all_platforms"]
  constructor() {
  }

  ngOnInit() {
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index == 0) {
      this.selected_tab_gs = true;
      this.selected_tab_dim = false;
      this.selected_tab_user_view = false;
      this.selected_tab_statistics = false;
    }
    else if (tabChangeEvent.index == 1) {
      this.selected_tab_gs = false;
      this.selected_tab_dim = true;
      this.selected_tab_user_view = false;
      this.selected_tab_statistics = false;
    }
    else if (tabChangeEvent.index == 2) {
      this.selected_tab_gs = false;
      this.selected_tab_dim = false;
      this.selected_tab_user_view = true;
      this.selected_tab_statistics = false;
    }
    else if (tabChangeEvent.index == 3) {
      this.selected_tab_gs = false;
      this.selected_tab_dim = false;
      this.selected_tab_user_view = false;
      this.selected_tab_statistics = true;
    }
  }

  updateSelectedPlatforms(event) {
    this.selectedPlatforms = event
  }
}

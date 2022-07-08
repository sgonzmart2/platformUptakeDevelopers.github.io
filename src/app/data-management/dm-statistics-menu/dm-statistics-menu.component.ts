import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-dm-statistics-menu',
  templateUrl: './dm-statistics-menu.component.html',
  styleUrls: ['./dm-statistics-menu.component.css']
})
export class DmStatisticsMenuComponent implements OnInit {

  selected_tab_statistics_def = true;
  selected_tab_statistics_value = false;

  constructor() { }

  ngOnInit() {
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index == 0) {
      this.selected_tab_statistics_def = true;
      this.selected_tab_statistics_value = false;
    }
    else if (tabChangeEvent.index == 1) {
      this.selected_tab_statistics_def = false;
      this.selected_tab_statistics_value = true;
    }
  }

}

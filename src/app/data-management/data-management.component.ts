import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UserDOAService } from '../api/DOA/user-doa.service';

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.css']
})
export class DataManagementComponent implements OnInit {

  selected_tab_platform = true;
  selected_tab_kpi = false;
  //selected_tab_kpi_values = false;
  selected_tab_period = false;
  selected_tab_statistics = false;
  selected_tab_contextual = false;
  isAdmin = false
  isOwner = false
  constructor(private userDao: UserDOAService) {
    this.isAdmin = this.userDao.userIsAdmin();
    this.isOwner = this.userDao.userIsOwner()
  }

  ngOnInit() {
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index == 0) {
      this.selected_tab_platform = true;
      this.selected_tab_kpi = false;
      this.selected_tab_period = false;
      this.selected_tab_statistics = false;
      this.selected_tab_contextual = false;
    }
    else if (tabChangeEvent.index == 1) {
      this.selected_tab_platform = false;
      this.selected_tab_kpi = true;
      this.selected_tab_period = false;
      this.selected_tab_statistics = false;
      this.selected_tab_contextual = false;
    }
    else if (tabChangeEvent.index == 2) {
      this.selected_tab_platform = false;
      this.selected_tab_kpi = false;
      this.selected_tab_period = false;
      this.selected_tab_statistics = true;
      this.selected_tab_contextual = false;
    }
    else if (tabChangeEvent.index == 3) {
      this.selected_tab_platform = false;
      this.selected_tab_kpi = false;
      this.selected_tab_period = true;
      this.selected_tab_statistics = false;
      this.selected_tab_contextual = false;
    }
    else if (tabChangeEvent.index == 4) {
      this.selected_tab_platform = false;
      this.selected_tab_kpi = false;
      this.selected_tab_period = false;
      this.selected_tab_statistics = false;
      this.selected_tab_contextual = true;
    }
  }

}

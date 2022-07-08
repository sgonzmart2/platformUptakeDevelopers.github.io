import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { UserDOAService } from 'src/app/api/DOA/user-doa.service';

@Component({
  selector: 'app-dm-kpi',
  templateUrl: './dm-kpi.component.html',
  styleUrls: ['./dm-kpi.component.css']
})
export class DmKpiComponent implements OnInit {
  selected_tab_kpi_def = true;;
  selected_tab_kpi_values = false;

  isAdmin = false;
  constructor(private userDao: UserDOAService) {
    this.isAdmin = this.userDao.userIsAdmin();
  }

  ngOnInit() { }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index == 0) {
      this.selected_tab_kpi_def = true;
      this.selected_tab_kpi_values = false;
    }
    else if (tabChangeEvent.index == 1) {
      this.selected_tab_kpi_def = false;
      this.selected_tab_kpi_values = true;
    }
  }
}

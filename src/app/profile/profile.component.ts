import { Component, OnInit } from '@angular/core';
import { PlatformsDOAService } from '../api/DOA/platforms-doa.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private platformServices: PlatformsDOAService) { }

  ngOnInit() { }

}

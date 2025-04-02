import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SpacexapiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css']
})
export class MissionfilterComponent {
  missions: Mission[] = [];
  years: string[] = ['2006', '2007', '2008', '2009', '2010', '2011'];

  constructor(private spaceXService: SpacexapiService) {}

  filterByYear(year: string): void {
    this.spaceXService.getMissionsByYear(year).subscribe(data => {
      this.missions = data;
    });
  }

  resetFilter(): void {
    this.spaceXService.getAllMissions().subscribe(data => {
      this.missions = data;
    });
  }

  ngOnInit(): void {
    this.resetFilter();
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router'; // ✅ Add this!
import { SpacexapiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, RouterModule], // ✅ Add RouterModule here too
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {
  missions: Mission[] = [];
  allMissions: Mission[] = [];

  filterYear = '';
  launchSuccess = '';
  landingSuccess = '';

  constructor(private spaceXService: SpacexapiService) {}

  ngOnInit(): void {
    this.spaceXService.getAllMissions().subscribe(data => {
      this.allMissions = data;
      this.missions = data;
    });
  }

  applyFilters(): void {
    this.missions = this.allMissions.filter(mission => {
      const yearMatch = this.filterYear === '' || mission.launch_year === this.filterYear;
      const launchMatch =
        this.launchSuccess === '' ||
        (this.launchSuccess === 'success' && mission.launch_success) ||
        (this.launchSuccess === 'failed' && mission.launch_success === false);

      const landMatch =
        this.landingSuccess === '' ||
        (this.landingSuccess === 'success' && mission.rocket.first_stage.cores[0]?.land_success) ||
        (this.landingSuccess === 'failed' && mission.rocket.first_stage.cores[0]?.land_success === false);

      return yearMatch && launchMatch && landMatch;
    });
  }

  resetFilters(): void {
    this.filterYear = '';
    this.launchSuccess = '';
    this.landingSuccess = '';
    this.missions = this.allMissions;
  }
}

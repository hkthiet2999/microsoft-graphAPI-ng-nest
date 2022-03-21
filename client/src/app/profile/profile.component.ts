import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../alerts.service';
import { GraphService } from '../graph.service';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

type ProfileType = {
  email?: string;
  firstName?: string;
  lastName?: string;
  id?: string;
  fullName?: string;
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile!: ProfileType;
  public profileResult?: MicrosoftGraph.Event[];
  constructor(
    private alertsService: AlertsService,
    private graphService: GraphService
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  async getProfile() {
    try {
      let profileReturn = await this.graphService.getProfile();
      if (profileReturn) {
        this.profile = {
          email: profileReturn.userPrincipalName,
          firstName: profileReturn.givenName,
          lastName: profileReturn.surname,
          id: profileReturn.id,
          fullName: profileReturn.displayName,
        };
      }

      console.log('profileReturn:', profileReturn);

      this.alertsService.addSuccess('Get User Profile Successful');
    } catch (error: any) {
      this.alertsService.addError('Get User Profile Fail!', error.message);
    }
  }
}

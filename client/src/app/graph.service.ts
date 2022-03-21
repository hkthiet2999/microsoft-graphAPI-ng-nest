// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Injectable } from '@angular/core';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

import { AuthService } from './auth.service';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor(
    private authService: AuthService,
    private alertsService: AlertsService
  ) {}

  async getCalendarView(
    start: string,
    end: string,
    timeZone: string
  ): Promise<MicrosoftGraph.Event[] | undefined> {
    if (!this.authService.graphClient) {
      this.alertsService.addError('Graph client is not initialized.');
      return undefined;
    }

    try {
      // GET /me/calendarview?startDateTime=''&endDateTime=''
      // &$select=subject,organizer,start,end
      // &$orderby=start/dateTime
      // &$top=50
      const result = await this.authService.graphClient
        .api('/me/calendarview')
        .header('Prefer', `outlook.timezone="${timeZone}"`)
        .query({
          startDateTime: start,
          endDateTime: end,
        })
        .select('subject,organizer,start,end')
        .orderby('start/dateTime')
        .top(50)
        .get();

      return result.value;
    } catch (error) {
      this.alertsService.addError(
        'Could not get events',
        JSON.stringify(error, null, 2)
      );
    }
    return undefined;
  }

  // <AddEventSnippet>
  async addEventToCalendar(newEvent: MicrosoftGraph.Event): Promise<void> {
    if (!this.authService.graphClient) {
      this.alertsService.addError('Graph client is not initialized.');
      return undefined;
    }

    try {
      // POST /me/events
      await this.authService.graphClient.api('/me/events').post(newEvent);
    } catch (error) {
      throw Error(JSON.stringify(error, null, 2));
    }
  }
  // </AddEventSnippet>

  async getProfile() {
    if (!this.authService.graphClient) {
      this.alertsService.addError('Graph client is not initialized.');
      return undefined;
    }

    try {
      // GET /me/

      let profile = await this.authService.graphClient.api('/me').get();

      console.log(profile);
      return profile;
    } catch (error) {
      this.alertsService.addError(
        'Could not get events',
        JSON.stringify(error, null, 2)
      );
    }
    return undefined;
  }

  async getMails() {
    if (!this.authService.graphClient) {
      this.alertsService.addError('Graph client is not initialized.');
      return undefined;
    }

    try {

      let mails = await this.authService.graphClient.api('/me/messages').select('sender,subject').get();

      console.log('Get mails object:', mails);
      return mails.value;
    } catch (error) {
      this.alertsService.addError(
        'Could not get events',
        JSON.stringify(error, null, 2)
      );
    }
    return undefined;
  }
}

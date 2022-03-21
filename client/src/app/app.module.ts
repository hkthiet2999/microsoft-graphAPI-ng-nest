// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IPublicClientApplication,
         PublicClientApplication,
         BrowserCacheLocation } from '@azure/msal-browser';
import { MsalModule,
         MsalService,
         MSAL_INSTANCE } from '@azure/msal-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './alerts/alerts.component';
import { OAuthSettings } from '../oauth';
import { CalendarComponent } from './calendar/calendar.component';
import { NewEventComponent } from './new-event/new-event.component';
import { ProfileComponent } from './profile/profile.component';
import { MailComponent } from './mail/mail.component';

// <MSALFactorySnippet>
let msalInstance: IPublicClientApplication | undefined = undefined;

export function MSALInstanceFactory(): IPublicClientApplication {
  msalInstance = msalInstance ?? new PublicClientApplication({
    auth: {
      clientId: OAuthSettings.appId,
      redirectUri: OAuthSettings.redirectUri,
      postLogoutRedirectUri: OAuthSettings.redirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    }
  });

  return msalInstance;
}
// </MSALFactorySnippet>

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AlertsComponent,
    CalendarComponent,
    NewEventComponent,
    ProfileComponent,
    MailComponent
  ],
  // <ImportsSnippet>
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MsalModule
  ],
  // </ImportsSnippet>
  // <ProvidersSnippet>
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ],
  // </ProvidersSnippet>
  bootstrap: [AppComponent]
})
export class AppModule { }

import { GraphService } from './../graph.service';
import { AlertsService } from './../alerts.service';
import { Component, OnInit } from '@angular/core';


type MailType = {
  id?: any;
  sender?: string;
  subject?: string;
  from?: string;
}


@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  mailsList!: MailType[];
  mailListReturn!: any;
  constructor(
    private alertsService: AlertsService,
    private graphService: GraphService
  ) { }

  ngOnInit(): void {
    this.getMails();
  }

  async getMails() {
    try {
      this.mailListReturn = await this.graphService.getMails();
      // if (mailListReturn) {
      //   // this.profile = {
      //   //   email: profileReturn.userPrincipalName,
      //   //   firstName: profileReturn.givenName,
      //   //   lastName: profileReturn.surname,
      //   //   id: profileReturn.id,
      //   //   fullName: profileReturn.displayName,
      //   // };

      //   // mailListReturn.map((mail, index) => {
      //   //   this.mailsList.push(mail)


      //   // // this.mailsList = {
      //   // //   id: mailListReturn
      //   // // }
      //   // console.log('mailListReturn:', mailListReturn);

      // }


      this.alertsService.addSuccess('Get User Mails Successful');
    } catch (error: any) {
      this.alertsService.addError('Get User Mails Fail!', error.message);
    }
  }

}

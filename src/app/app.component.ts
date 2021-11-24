import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Posting App';

  constructor(private msalService : MsalService){}

  ngOnInit(){
    this.msalService.instance.handleRedirectPromise().then(
      (res) => {
        if(res != null && res.account != null)
          this.msalService.instance.setActiveAccount(res.account);
      }
    )
  }

  isLoggedIn() : boolean{
    return this.msalService.instance.getActiveAccount() != null;
  }
}

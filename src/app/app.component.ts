import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todolist';

  constructor(private msalService : MsalService){}

  ngOnInit(){
    this.msalService.instance.handleRedirectPromise().then(
      (res) => {
        if(res != null && res.account != null)
          this.msalService.instance.setActiveAccount(res.account);
      }
    )
    console.log("Status",this.isLoggedIn());
  }

  isLoggedIn() : boolean{
    return this.msalService.instance.getActiveAccount() != null;
  }


  // login(){
  //   this.msalService.loginRedirect();
  // }

  // logout(){
  //   this.msalService.logout();
  // }
}

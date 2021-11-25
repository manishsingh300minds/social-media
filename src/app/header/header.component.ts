import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input('isAuth') auth! : boolean;
  userName! : string | undefined;
  previousId = 'list';

  constructor(public msalService : MsalService, public router: Router) { }

  ngOnInit(): void {
    if(this.msalService.instance.getActiveAccount() !== null){
        this.userName = this.msalService.instance.getActiveAccount()?.name
    }
  }

  // To change the text effect of active nav tab
  changePage(event : Event){
    const elementId: string = (event.target as Element).id;
    const element = document.getElementById(elementId);
    const previousElement = document.getElementById(this.previousId);

    if(previousElement)
      previousElement.classList.remove('active');

    if(element)
      element.classList.add('active');

    this.previousId = elementId;
  }

  login(){
    this.msalService.loginPopup().subscribe((res : AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(res.account)
      if(res.account?.name)
        this.userName = res.account?.name;
      this.router.navigate(['']);
    })
  }

  logout(){
    this.msalService.logout().subscribe(res => {
      this.router.navigate(['public']);
    });
  }
}

/*
https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flisting&client-request-id=53c34968-b84a-4133-b3b6-a41ed3cf2506
https://login.microsoftonline.com/common/oauth2/v2.0/logoutsession
 */

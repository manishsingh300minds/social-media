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
    this.msalService.logout();
  }
}

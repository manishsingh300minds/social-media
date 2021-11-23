import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { PostsService } from './posts.service';
import { HttpClientModule } from '@angular/common/http';

import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { RestrictedPageComponent } from './restricted-page/restricted-page.component';
import { PublicComponent } from './public/public.component';
import { AuthComponent } from './auth/auth.component';
import { MsalGuard } from './msal.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInstanceFactory() : IPublicClientApplication {
  return new PublicClientApplication({
    auth : {
      clientId : '6029825f-439d-47f1-8f47-137768262bd3',
      redirectUri: 'http://localhost:4200'
    }
  })
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RestrictedPageComponent,
    PublicComponent,
    AuthComponent,
  ],
  imports: [
    appRoutingModule,
    BrowserModule,
    HttpClientModule, 
    ReactiveFormsModule,
    MsalModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    PostsService,
    {
      provide: MSAL_INSTANCE,
      useFactory : MSALInstanceFactory,

    },
    MsalGuard,
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PublicComponent } from './public/public.component';

import { PostsService } from './services/posts.service';
import { MsalGuard } from './guard/msal.guard';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

export function MSALInstanceFactory() : IPublicClientApplication {
  return new PublicClientApplication({
    auth : {
      clientId : '6029825f-439d-47f1-8f47-137768262bd3',
      redirectUri: 'http://localhost:4200',
      postLogoutRedirectUri: 'http://localhost:4200/public'
    }
  })
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PublicComponent,
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

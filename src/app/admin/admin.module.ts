import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { ListingComponent } from "./listing/listing.component";
import { CreateComponent } from "./create/create.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { routes } from "./admin-routing";
import { HttpClientModule } from "@angular/common/http";
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'
@NgModule({
    declarations: [
        AdminComponent,
        ListingComponent,
        CreateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbAlertModule
    ],
    bootstrap: [AdminComponent]

})
export class AdminModule {}
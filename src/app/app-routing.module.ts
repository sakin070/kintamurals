import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaLoginRedirectComponent } from '@okta/okta-angular';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

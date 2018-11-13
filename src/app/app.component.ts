import { Component, NgModule } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgbModule.forRoot()
  ],
  bootstrap: [AppComponent]
})

export class AppComponent {
}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-event-form-model',
  templateUrl: './add-event-form-model.component.html',
  styleUrls: ['./add-event-form-model.component.scss']
})
export class AddEventFormModelComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) { }

    closeModal(){
      this.activeModal.close("Modal Closed");
    }

  ngOnInit() {
  }


}

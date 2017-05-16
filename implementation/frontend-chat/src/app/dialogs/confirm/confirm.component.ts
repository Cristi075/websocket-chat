import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent extends DialogComponent<ConfirmModel,boolean>{

  constructor(dialogService: DialogService) { 
    super(dialogService);
    this.result = false; // Be default the choice is 'no'
  }

  confirm() {
    this.result = true;
    this.close();
  }

}

export interface ConfirmModel {
  title:string;
  message:string;
}
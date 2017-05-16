import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent  extends DialogComponent<InfoModel,void>{

  constructor(dialogService: DialogService) { 
    super(dialogService);
  }

}

export interface InfoModel {
  title   : string;
  message : string;
  message2: string;
  success : boolean;
}
import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent extends DialogComponent<InputModel,string> {
  private userInput: string;

  constructor(dialogService: DialogService) { 
    super(dialogService);
  }

  confirm() {
    this.result = this.userInput;
    this.close();
  }
}

export interface InputModel {
  title:string;
  placeholder:string;
  type: InputType;
}

export type InputType = "text" | "password";
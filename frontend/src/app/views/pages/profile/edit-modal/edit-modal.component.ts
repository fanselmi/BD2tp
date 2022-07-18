import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UrlModel } from "../../../../models/url.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  form!: FormGroup;

  date!: Date;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {url: UrlModel}, ) { }

  ngOnInit(): void {
    this.date = new Date(0);
    this.date.setSeconds(this.data.url.expDate || 0);
    const dateString: string = this.date.getFullYear() + '-' + (this.date.getMonth() + 1).toString().padStart(2, '0') + '-' + this.date.getDate().toString().padStart(2, '0');


    this.form = new FormGroup({
      originalUrl: new FormControl(this.data.url.original, [Validators.required, Validators.maxLength(150), CustomValidators.url]),
      expirationDate: new FormControl(dateString)
    })
  }

  get originalUrl(){
    return this.form.get('originalUrl');
  }

  get expirationDate(){
    return this.form.get('expirationDate');
  }

  onSubmit(){
    return new UrlModel(this.originalUrl?.value ?? this.data.url.original, this.data.url.userId, this.data.url.id, this.expirationDate?.value ?? (this.data.url.expDate ?? 0))
  }

}

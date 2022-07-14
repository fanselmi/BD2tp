import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UrlsService} from "../../../../services/urls.service";
import {Clipboard} from '@angular/cdk/clipboard';
import {MatTooltip} from "@angular/material/tooltip";
import {finalize} from "rxjs";
import {UrlModel} from "../../../../models/url.model";

@Component({
  selector: 'app-create-url',
  templateUrl: './create-url.component.html',
  styleUrls: ['./create-url.component.scss']
})
export class CreateUrlComponent implements OnInit {

  public urlForm!: FormGroup;
  public generatedUrl: string = '';
  public  pageUrl: string = "http://localhost:4200/";
  public loading: boolean = false;
  public customizing: boolean = false;
  public minDate!: Date;
  public maxDate!: Date;

  @ViewChild('tooltip')  tooltip!: MatTooltip;

  constructor(private urlService: UrlsService,
              private clipboard: Clipboard) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 3, 11, 31);
  }

  ngOnInit(): void {
    this.urlForm = new FormGroup({
      longUrl: new FormControl('', [Validators.required, Validators.maxLength(150)])
    })

  }

  public onSubmit(): void{
    if(!this.urlForm.valid){
      return;
    }
    let url =this.urlForm.controls['longUrl'].value;
    let data: UrlModel = new UrlModel(url, '95337287-e6b9-48fc-ad13-214e8eb08b83');
    if(this.customizing){
      let exp_date = this.urlForm.controls['expirationDate'].value;
      let id = this.urlForm.controls['text'].value;
      if(exp_date != '') data.exp_date = exp_date;
      if(id != '') data.id = id;
    }

    this.loading = true;
    this.urlService.createUrl(data)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
    ).subscribe({
      next: res => {
        this.generatedUrl = res.id;
      }, error: err => {
        console.log(err); //TODO show error mesage
      }
    })


  }

  public copyUrl(): void {
    this.clipboard.copy(this.pageUrl + this.generatedUrl);
    this.tooltip.show();
    this.urlService.getOriginalUrl(this.generatedUrl).subscribe({
      next: data => {
        console.log(data);
       // console.log(data.Items[0]);
      }, error: err => {
        console.log(err);
      }
    })
  }

  public customizeForm(): void {
    this.urlForm.addControl('text', new FormControl('', [Validators.maxLength(5), Validators.minLength(5)]) )
    this.urlForm.addControl('expirationDate', new FormControl('') )
    this.customizing = true;
  }

}

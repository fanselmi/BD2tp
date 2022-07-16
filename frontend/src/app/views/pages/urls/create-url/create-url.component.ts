import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UrlsService} from "../../../../services/urls.service";
import {Clipboard} from '@angular/cdk/clipboard';
import {MatTooltip} from "@angular/material/tooltip";
import { BehaviorSubject, finalize } from "rxjs";
import {UrlModel} from "../../../../models/url.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomValidators} from "ng2-validation";
import { UserService } from "../../../../services/user.service";

@Component({
  selector: 'app-create-url',
  templateUrl: './create-url.component.html',
  styleUrls: ['./create-url.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateUrlComponent implements OnInit {

  public urlForm!: FormGroup;
  public generatedUrl: string = '';
  public  pageUrl: string = "http://localhost:4200/";
  public loading: boolean = false;
  public customizing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public minDate!: Date;
  public maxDate!: Date;

  @ViewChild('tooltip')  tooltip!: MatTooltip;

  constructor(private urlService: UrlsService,
              private clipboard: Clipboard,
              private _snackBar: MatSnackBar,
              public userService: UserService
              ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 3, 11, 31);
  }

  ngOnInit(): void {
    this.urlForm = new FormGroup({
      longUrl: new FormControl('', [Validators.required, Validators.maxLength(150), CustomValidators.url])
    })

  }

  public onSubmit(): void{
    if(!this.urlForm.valid){
      return;
    }
    let url =this.urlForm.controls['longUrl'].value;
    let data: UrlModel = new UrlModel(url, '3d2bbb76-edca-436e-a2b8-a43525655c87');
    if(this.customizing.value){
      let expDate = this.urlForm.controls['expirationDate'].value;
      let id = this.urlForm.controls['text'].value;
      if(expDate != '') data.expDate = expDate;
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
          this._snackBar.open('Could not shorten url', 'Close', {
            verticalPosition: 'top',
            panelClass: 'error-snackbar'
          })
      }
    })


  }

  public copyUrl(): void {
    this.clipboard.copy(this.pageUrl + this.generatedUrl);
    this.tooltip.show();
  }

  public customizeForm(): void {
    this.urlForm.addControl('text', new FormControl('', [Validators.maxLength(5), Validators.minLength(5)]) )
    this.urlForm.addControl('expirationDate', new FormControl('') )
    this.customizing.next(true);
  }

}

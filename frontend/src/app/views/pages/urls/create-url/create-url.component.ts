import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UrlsService} from "../../../../services/urls.service";
import {Clipboard} from '@angular/cdk/clipboard';
import {MatTooltip} from "@angular/material/tooltip";
import {finalize} from "rxjs";

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

  @ViewChild('tooltip')  tooltip!: MatTooltip;

  constructor(private urlService: UrlsService,
              private clipboard: Clipboard) { }

  ngOnInit(): void {
    this.urlForm = new FormGroup({
      longUrl: new FormControl('', [Validators.required])
    })

  }

  public onSubmit(): void{
    if(!this.urlForm.valid){
      return;
    }
    let url =this.urlForm.controls['longUrl'].value;
    this.loading = true;
    this.urlService.createUrl(url)
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
  }

}

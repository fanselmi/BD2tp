import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UrlModel } from "../../../../models/url.model";
import { UrlsService } from "../../../../services/urls.service";
import { first } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { EditModalComponent } from "../edit-modal/edit-modal.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-url-card',
  templateUrl: './url-card.component.html',
  styleUrls: ['./url-card.component.scss']
})
export class UrlCardComponent implements OnInit {

  @Input() urlInfo!: UrlModel;

  date!: Date;

  @Output() changeUrl: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private urlsService: UrlsService, private dialog: MatDialog, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.date = new Date(0);
    this.date.setSeconds(this.urlInfo.expDate || 0);
  }

  editUrl(){
    const dialogRef = this.dialog.open(EditModalComponent, {
      data: { url: this.urlInfo },
    });

    dialogRef.afterClosed().pipe(first()).subscribe((url : UrlModel) => {
      if ( url ){

        if ( url.original ) this.urlInfo.original = url.original;
        if ( url.expDate ) this.urlInfo.expDate = url.expDate;

        this.urlsService.editUrl(this.urlInfo).pipe(first())
          .subscribe({
            next: res => {
              this.changeUrl.emit(true);
            }, error: err => {
              this._snackBar.open('Could not edit url', 'Close', {
                verticalPosition: 'top',
                panelClass: 'error-snackbar'
              });
            }
          })
      }
    })
  }
  deleteUrl(){
    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().pipe(first()).subscribe((confirmation) => {
      if ( confirmation ) {
        this.urlsService.deleteUrl(this.urlInfo).pipe(first())
          .subscribe({
            next: res => {
              if (res.$metadata.httpStatusCode === 200)
                this.changeUrl.emit(true);
            }, error: err => {
              this._snackBar.open('Could not delete url', 'Close', {
                verticalPosition: 'top',
                panelClass: 'error-snackbar'
              });
            }
          })
      }
  });
  }


}

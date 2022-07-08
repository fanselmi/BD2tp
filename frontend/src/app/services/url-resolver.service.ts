import { Injectable } from '@angular/core';
import {UrlsService} from "./urls.service";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {catchError, EMPTY, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlResolverService implements Resolve<any> {

  constructor(private urlService: UrlsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let id = route.params['id'];
    return this.urlService.getOriginalUrl(id).pipe(
      catchError(error => {
        this.router.navigate(["/404"]);
        return EMPTY;
      })
    );
  }
}

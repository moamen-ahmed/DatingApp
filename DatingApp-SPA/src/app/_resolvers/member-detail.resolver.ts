import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_services/alertify.service';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { UserService } from './../_services/user.service';
import { User } from '../_models/User';


@Injectable()
export class MemberDetailResolver implements Resolve<User>{
    constructor(private userService:UserService,
        private router:Router,private alertify:AlertifyService){}

        resolve(route: ActivatedRouteSnapshot):Observable<User>{
            return this.userService.getUser(route.params['id']).pipe(
                catchError(error =>{
                    this.alertify.error('Problem retrieving data');
                    this.router.navigate(['/members']);
                    return of(null);
                })
            );
        }
}

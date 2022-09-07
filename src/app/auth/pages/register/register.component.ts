import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  myform: FormGroup = this.fb.group({
    'name': [ 'Test1', [ Validators.required ] ],
    'mobile': [ '56789854', [ Validators.required, Validators.minLength(8) ] ],
    'email': [ 'test1@gmail.com', [ Validators.required, Validators.pattern(this.emailPattern) ] ],
    'password': [ '123456', [ Validators.required, Validators.minLength(6) ] ],
  })

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService
               ) { }

  validField( field: string ) {
    return this.myform.controls[field].touched &&
            this.myform.controls[field].invalid 
  }

  register() {
    
    const { name, email, password, mobile } = this.myform.value;
    
    this.authService.register( name, email, password, mobile )
      .subscribe( resp => {
        if ( resp.user ) {
          this.router.navigateByUrl('/user/profile');
        } else {
          Swal.fire( 'Error', resp, 'error' );
        }
      } )

  }


}
import { Component, OnInit } from '@angular/core';
import { UserModel } from './user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup,FormControl } from '@angular/forms';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 title:string="Sign Up";
 userDetails:any =new UserModel("","",0,"","");
  constructor(public userService:UserService, public router:Router, public fb:FormBuilder) { }

  ngOnInit(): void {
  }
 
  signUp()
  {//alert(this.userDetails.fName);
    this.userService.addUser(this.userDetails);
    console.log("called");
    alert("new User added");
    this.router.navigate(['/']);
   // router.navigate(["/"]);
  }
}
 
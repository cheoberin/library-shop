import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit{
  signInForm!: FormGroup;
  spinner:boolean = false;
  constructor(public fb:FormBuilder, private userService:UserService) {
    this.signInForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    });
  }

  ngOnInit(): void {}

  loginUser(){
    this.userService.signIn(this.signInForm.value);
    this.spinner = true;

    const fakeAsyncOperation = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("");
      }, 3000);
    });

    fakeAsyncOperation.then((userRes) => {
      this.spinner = false;
    }).catch((error) => {
      this.spinner = false;
    });
  }

}





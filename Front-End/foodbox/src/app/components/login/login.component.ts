import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Router} from "@angular/router"
import { User } from 'src/app/common/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  username:string = localStorage.getItem('username');
  user:User = new User();
  user2:User = new User();

  users: Array<User> = new Array();
  
  username_value:string;


  constructor(private loginService: LoginService,  
              private router: Router) { }


  ngOnInit(): void {
    
 
  
  }

  handleLogin() {

    
    this.loginService.getUser(this.user.username).subscribe(
      data => {
       this.users = data; 
        
      }
      ,error => console.log(error));


    // check data entered
    if(this.users[0]?.username == this.user.username){
      localStorage.setItem('username', this.user.username);
 
      console.log("YES");
 
      window.location.replace('/products');
      
    }
    else{
      console.log("No");
    }
   

  }
  onSubmit(){
    console.log(this.user);
     
    this.handleLogin();
  }


}


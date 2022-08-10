import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  username:string = localStorage.getItem('username');

  constructor(private route: Router) { }

  

  ngOnInit(): void {
     
  }

 

  logout(){
    this.username = null;
    localStorage.removeItem("username");
    location.reload();
  }

}

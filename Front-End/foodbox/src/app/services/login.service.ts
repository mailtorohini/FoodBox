import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../common/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

 
  private baseUrl = 'http://localhost:8080/api/users';
  private baseUrlController = "http://localhost:8080/api/v1/users";

  constructor(private httpClient: HttpClient) { }


  getUser(username: string): Observable<User[]> {

    // search url
    const searchUrl = `${this.baseUrl}/search/findByUsername?username=${username}`;

    return this.httpClient.get<GetResponseUser>(searchUrl).pipe(
      map(response => response._embedded.users)
    );
  }


  createUser(user: User): Observable<Object>{
    return this.httpClient.post(`${this.baseUrlController}`, user);
  }
 


}


interface GetResponseUser {
  _embedded: {
    users: User[];
  }}

 
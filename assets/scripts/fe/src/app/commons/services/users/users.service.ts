import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USERS } from '../../constants/api.constants';
import { User } from '../../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  allUsers: Array<User>;

  constructor(private http: HttpClient) { }

  fetchUsers(): Promise<Array<User>> {
    return this.http.get<Array<User>>(USERS)
      .toPromise();
  }
}

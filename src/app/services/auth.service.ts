import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public static logged: boolean = false;
  userData: any;
  token: string | undefined;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private http: HttpClient
  ) {
    this.updateLogin();
  }

  async updateLogin() {
    try {
      const user = (await firstValueFrom(this.afAuth.authState))
      console.log(user)
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        AuthService.logged = true;
      } else {
        this.userData = null;
        localStorage.removeItem('user');
        AuthService.logged = false;
      }
      console.log('Logged: ' + AuthService.logged)
      console.log('JWT: ' + this.getJWT())
    } catch (error) {
      console.log(error)
    }
  }

  checkLogged() {
    if (localStorage.getItem('user') === null) {
      this.userData = null;
      AuthService.logged = false;
      return false;
    }
    AuthService.logged = true;
    return true;
  }

  async doSignup(value: { email: string; password: string; }) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(value.email, value.password);
      this.updateLogin();
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async doLogin(value: { email: string; password: string; }) {
    try {
      const response = await this.afAuth.signInWithEmailAndPassword(value.email, value.password);
      if (response.user) {
        this.updateLogin();
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  async doLogout() {
    try {
      await this.afAuth.signOut();
      this.updateLogin();
    } catch (error) {
      console.log(error);
    }
  }

  async fetchJWT() {
    const token = (await lastValueFrom(this.http.post<any>(`${environment.url}login`, {
      email: "test@test.com",
    }))).token;
    if (token) this.setJWT(token);
  }

  setJWT(token: string) {
    localStorage.setItem('JWT', token);
    this.token = token;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getJWT() {
    return localStorage.getItem('JWT');
  }
}

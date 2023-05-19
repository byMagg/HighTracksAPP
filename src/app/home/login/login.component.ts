import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonModal, IonicModule } from '@ionic/angular';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent implements OnInit {

  @Input() modal: IonModal | undefined;

  formValidationLogin: FormGroup | undefined;
  errorMessage: string = '';
  logged = this.authService.checkLogged();
  showLogin = true;
  userData: string | undefined;

  formValidationMessages = {
    'email': [
      { type: 'required', message: 'El email es un campo obligatorio.' },
      { type: 'pattern', message: 'El formato del email no es correcto.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es un campo obligatorio.' },
      { type: 'minlength', message: 'La lóngitud mínima de una contraseña es 6 caracteres.' }
    ]
  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserData();
    this.formValidationLogin = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  trySignup(value: { email: string; password: string; }) {
    this.authService.doSignup(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.router.navigate(["/"]);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      })
  }


  async tryLogin(value: { email: string; password: string; }) {
    try {
      await this.authService.doLogin(value);
      this.modal?.dismiss(null, 'confirm');
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code == "auth/wrong-password") this.errorMessage = "Contraseña incorrecta";
        if (error.code == "auth/user-not-found") this.errorMessage = "Usuario no encontrado";
      }
    }
  }

  async logout() {
    try {
      await this.authService.doLogout();
      this.modal?.dismiss(null, 'confirm');
    }
    catch (error) {
      console.log(error);
    }
  }

  async getUserData() {
    this.userData = await this.authService.getUser()['email'];
    console.log(this.userData);
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }
}
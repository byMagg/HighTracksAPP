import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, RouterModule } from '@angular/router';
import { IonModal, IonicModule, NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { LoginComponent } from "./login/login.component";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    LoginComponent]
})
export class HomePage implements OnInit {

  query: string | undefined;
  @ViewChild(IonModal) modal: IonModal | undefined;

  constructor(public navCtrl: NavController) { }

  ngOnInit() { }

  search() {
    let navigationExtras: NavigationExtras = {
      queryParams: { s: this.query },
    };
    this.navCtrl.navigateForward(['tracks'], navigationExtras);
  }

  cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal?.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log('Confirm');
    }
  }
}
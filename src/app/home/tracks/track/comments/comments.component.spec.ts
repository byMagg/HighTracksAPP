import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CommentsComponent } from './comments.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommentsComponent, HttpClientTestingModule, AngularFireModule.initializeApp(environment.firebase)]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

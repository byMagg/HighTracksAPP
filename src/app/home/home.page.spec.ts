import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), HomePage,]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search() should navigate to tracks page', () => {
    spyOn(component.navCtrl, 'navigateForward');
    component.query = 'test';
    component.search();
    expect(component.navCtrl.navigateForward).toHaveBeenCalledWith(['tracks'], { queryParams: { s: 'test' } });
  });

});
